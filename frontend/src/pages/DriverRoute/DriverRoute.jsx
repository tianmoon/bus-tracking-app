import React, { useMemo, useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bell, MapPin, Bus, AlertTriangle, Play, Square } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const socket = io('http://localhost:5000');

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon - Green
const busIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom bus stop icon - Blue
const busStopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function DriverRoute() {
  const todayStr = useMemo(() => {
    try {
      return new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Hôm nay";
    }
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId } = location.state || {};
  const [tripIdState, setTripIdState] = useState(tripId || null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [stops, setStops] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0, speed: 0, heading: 0 });
  const [mapCenter, setMapCenter] = useState([10.8231, 106.6297]); // Default: TP.HCM
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [useSimulation, setUseSimulation] = useState(false);
  const trackingIntervalRef = useRef(null);
  const watchIdRef = useRef(null);
  const mapRef = useRef(null);
  // const stats = [
  //   { label: "Vị trí hiện tại", value: "Đường Nguyễn Huệ" },
  //   { label: "Trạm tiếp theo", value: "Trạm B" },
  //   { label: "Thời gian dự kiến", value: "10 phút" },
  //   { label: "Tốc độ hiện tại", value: "50 km/h" },
  // ];

  // const routeInfo = [
  //   { k: "Mã tuyến", v: "R01" },
  //   { k: "Quãng đường", v: "12 km" },
  //   { k: "Thời gian dự kiến", v: "30 phút" },
  //   { k: "Tổng trạm dừng", v: "4" },
  // ];

  // const stops = [
  //   { name: "Trạm 1", status: "Đã đến", badge: "bg-green-100 text-green-700" },
  //   { name: "Trạm 2", status: "Đang đến", badge: "bg-yellow-100 text-yellow-700" },
  //   { name: "Trạm 3", status: "Chưa đến", badge: "bg-gray-100 text-gray-700" },
  //    { name: "Trạm 4", status: "Chưa đến", badge: "bg-gray-100 text-gray-700" },
  // ];

  const fetchBusStops = async (routeId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/routes/${routeId}`);
      if (response.data.status === 'success') {
        const stopsData = response.data.data;
        setStops(stopsData);
        
        // Set map center to first stop
        if (stopsData.length > 0 && stopsData[0].latitude && stopsData[0].longitude) {
          setMapCenter([stopsData[0].latitude, stopsData[0].longitude]);
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách trạm dừng:", error);
      toast.error("Lỗi khi lấy danh sách trạm dừng." + (error.response?.data?.message || ""));
    }
  };

  const fetchRouteData = async (tripId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/routes/info/${tripId}`);
      if (response.data.status === 'success') {
        setRouteInfo(response.data.data);
        const routeId = response.data.data.route_id;
        fetchBusStops(routeId);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tuyến đường:", error);
      toast.error("Lỗi khi lấy thông tin tuyến đường." + (error.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    const storedTripId = localStorage.getItem('tripId');
    setTripIdState(storedTripId || tripId);
    if (storedTripId || tripId) {
      fetchRouteData(storedTripId || tripId);
    }

    // Cleanup khi unmount
    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      socket.disconnect();
    };
  }, []);

  // Hàm lấy vị trí GPS
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Trình duyệt không hỗ trợ Geolocation'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, speed, heading } = position.coords;
          resolve({
            lat: latitude,
            lng: longitude,
            speed: speed ? (speed * 3.6).toFixed(1) : 0, // m/s -> km/h
            heading: heading || 0
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  };

  // Auto-center map khi có location mới
  useEffect(() => {
    if (isTracking && currentLocation.lat !== 0 && mapRef.current) {
      try {
        mapRef.current.setView([currentLocation.lat, currentLocation.lng], 15);
      } catch (error) {
        // Ignore if map not ready
      }
    }
  }, [currentLocation, isTracking]);

  // Hàm simulate di chuyển qua các trạm
  const simulateMovement = () => {
    if (stops.length === 0) {
      toast.error('Chưa có dữ liệu trạm dừng');
      return;
    }

    setIsTracking(true);
    setUseSimulation(true);
    setCurrentStopIndex(0);
    toast.success('Bắt đầu mô phỏng chuyến đi');

    let stopIndex = 0;

    // Di chuyển đến trạm đầu tiên
    const sortedStops = [...stops].sort((a, b) => a.order_index - b.order_index);
    const firstStop = sortedStops[0];
    
    const initialLocation = {
      lat: firstStop.latitude,
      lng: firstStop.longitude,
      speed: 0,
      heading: 0
    };
    
    setCurrentLocation(initialLocation);
    setMapCenter([firstStop.latitude, firstStop.longitude]);
    socket.emit('update-location', {
      trip_id: tripIdState,
      bus_id: routeInfo.bus_id,
      latitude: initialLocation.lat,
      longitude: initialLocation.lng,
      speed: 0,
      heading: 0,
      timestamp: new Date().toISOString()
    });

    // Di chuyển qua từng trạm mỗi 5 giây
    trackingIntervalRef.current = setInterval(() => {
      stopIndex++;
      
      if (stopIndex >= sortedStops.length) {
        stopIndex = 0; // Quay lại trạm đầu
      }

      const currentStop = sortedStops[stopIndex];
      setCurrentStopIndex(stopIndex);

      const newLocation = {
        lat: currentStop.latitude,
        lng: currentStop.longitude,
        speed: stopIndex < sortedStops.length - 1 ? 45 : 0, // Dừng ở trạm cuối
        heading: 0
      };

      setCurrentLocation(newLocation);
      setMapCenter([newLocation.lat, newLocation.lng]);

      socket.emit('update-location', {
        trip_id: tripIdState,
        bus_id: routeInfo.bus_id,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
        speed: newLocation.speed,
        heading: newLocation.heading,
        timestamp: new Date().toISOString()
      });

      // Emit thông báo đến trạm
      socket.emit('bus-arrival', {
        trip_id: tripIdState,
        bus_id: routeInfo.bus_id,
        plate_number: routeInfo.plate_number,
        stop_name: currentStop.stop_name,
        stop_index: stopIndex + 1,
        total_stops: sortedStops.length,
        timestamp: new Date().toISOString()
      });

      console.log(`Đến trạm ${stopIndex + 1}/${sortedStops.length}: ${currentStop.stop_name}`);
      toast.info(`Đến ${currentStop.stop_name}`, { autoClose: 2000 });

    }, 3000); // Mỗi 3 giây đến 1 trạm
  };

  // Hàm dừng tracking
  const stopTracking = () => {
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }
    setIsTracking(false);
    setUseSimulation(false);
    setCurrentStopIndex(0);
    toast.info('Đã dừng theo dõi chuyến đi');
  };


  if (routeInfo.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar userRole="driver" />

        <div className="flex-1">
          <Header />
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-600 text-lg">Chưa có thông tin</p>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar userRole="driver" />

        <div className="flex-1">
          <Header />
          {console.log("Route Info:", routeInfo)}
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Điều hướng</h2>
              <div className="flex gap-3">
                {!isTracking ? (
                  <button 
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    onClick={simulateMovement}
                  >
                    <Play size={18} />
                    Mô phỏng chuyến đi
                  </button>
                ) : (
                  <button 
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                    onClick={stopTracking}
                  >
                    <Square size={18} />
                    Dừng chuyến
                  </button>
                )}
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  onClick={() => navigate('/driver/issues')}>
                  Báo cáo sự cố
                </button>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border p-4">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div> */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white rounded-xl border shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">Bản đồ trực tiếp</h3>
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    className="h-full w-full"
                    ref={mapRef}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    
                    {/* Bus markers - hiển thị khi đang tracking */}
                    {isTracking && currentLocation.lat !== 0 && (
                      <Marker 
                        position={[currentLocation.lat, currentLocation.lng]}
                        icon={busIcon}
                      >
                        <Popup>
                          <div className="text-center p-2">
                            <p className="font-bold text-green-600">Xe buýt {routeInfo.plate_number}</p>
                            <p className="text-sm mt-1">Tốc độ: {currentLocation.speed} km/h</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date().toLocaleTimeString('vi-VN')}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    )}

                    {/* Bus stop markers */}
                    {stops.map((stop, index) => (
                      stop.latitude && stop.longitude && (
                        <Marker
                          key={stop.busstop_id}
                          position={[stop.latitude, stop.longitude]}
                          icon={busStopIcon}
                        >
                          <Popup>
                            <div className="p-2">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                  {stop.order_index}
                                </span>
                                <p className="font-bold text-gray-800">{stop.stop_name}</p>
                              </div>
                              <p className="text-xs text-gray-600">{stop.address}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Tọa độ: {stop.latitude.toFixed(6)}, {stop.longitude.toFixed(6)}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      )
                    ))}

                    {/* Polyline connecting stops */}
                    {stops.length > 1 && (
                      <Polyline
                        positions={stops
                          .filter(stop => stop.latitude && stop.longitude)
                          .sort((a, b) => a.order_index - b.order_index)
                          .map(stop => [stop.latitude, stop.longitude])}
                        color="#3b82f6"
                        weight={3}
                        opacity={0.7}
                        dashArray="10, 10"
                      />
                    )}
                  </MapContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="px-4 py-3 border-b">
                    <h4 className="font-semibold text-gray-800">Thông tin tuyến đường</h4>
                  </div>
                  <div className="p-4">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">Mã tuyến</dt>
                        <dd className="text-sm font-medium text-gray-900">{routeInfo.route_id}</dd>
                      </div>
                      <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">Tên tuyến</dt>
                        <dd className="text-sm font-medium text-gray-900">{routeInfo.name}</dd>
                      </div>
                      <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">Tổng trạm dừng</dt>
                        <dd className="text-sm font-medium text-gray-900">{routeInfo.stop_quantity}</dd>
                      </div>
                      <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">Tốc độ hiện tại</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          {isTracking ? `${currentLocation.speed} km/h` : '0 km/h'}
                        </dd>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">Vị trí GPS</dt>
                        <dd className="text-xs font-mono text-gray-700">
                          {isTracking ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}` : 'Chưa bắt đầu'}
                        </dd>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">Trạng thái</dt>
                        <dd className="text-sm font-medium">
                          {isTracking ? (
                            <span className="flex items-center gap-2 text-green-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              Đang theo dõi
                            </span>
                          ) : (
                            <span className="text-gray-500">Chưa bắt đầu</span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="px-4 py-3 border-b flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-600" />
                    <h4 className="font-semibold text-gray-800">Các điểm dừng</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    {stops
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((stop, index) => (
                      <div 
                        key={stop.busstop_id} 
                        className={`flex items-center justify-between p-2 rounded-lg transition ${
                          isTracking && index === currentStopIndex 
                            ? 'bg-green-100 border-2 border-green-500' 
                            : index < currentStopIndex && isTracking
                            ? 'bg-gray-100'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isTracking && index === currentStopIndex
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {stop.order_index}
                          </span>
                          <span className="text-sm text-gray-800">{stop.stop_name}</span>
                        </div>
                        {isTracking && index === currentStopIndex && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
                            Đang đến
                          </span>
                        )}
                        {isTracking && index < currentStopIndex && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-400 text-white">
                            Đã qua
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DriverRoute;

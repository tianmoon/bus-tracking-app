import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Navigation, Clock, Route } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import axios from 'axios';


// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component Modal Chi Tiết Tuyến Đường
const RouteDetailModal = ({ onClose, route, isOpen }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [busStops, setBusStops] = useState([])
    const [routeDetail, setRouteDetail] = useState({})
    const fetchBusStops = async (routeId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/routes/${routeId}`)
            if (response.data.status === "success") {
                setBusStops(response.data.data)
            }
        }
        catch (error) {
            console.error(error.response?.data?.message || error.message);
            toast.error(`Lỗi khi tải danh sách trạm`);
        }
    }

    useEffect(() => {
        if (route?.route_id) {
            fetchBusStops(route?.route_id);
        }
    }, [route]);

    useEffect(() => {
        setRouteDetail({
            route_id: route?.route_id,
            name: route?.name,
            start: route?.start,
            end: route?.end,
            stops: busStops,
        });
    }, [busStops]);


    useEffect(() => {
        if (isOpen && mapRef.current && !mapInstanceRef.current) {
            // Initialize map
            const map = L.map(mapRef.current).setView([10.7993, 106.7019], 13);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            mapInstanceRef.current = map;

            // Add markers for stops
            const bounds = [];
            routeDetail.stops.forEach((stop, index) => {
                const marker = L.marker([stop.latitude, stop.longitude]).addTo(map);
                marker.bindPopup(`
          <div style="min-width: 200px;">
            <strong style="font-size: 14px; color: #4F46E5;">Trạm ${index + 1}: ${stop.stop_name}</strong>
            <p style="margin: 4px 0; font-size: 12px;">${stop.address}</p>
          </div>
        `);
                // <p style="margin: 4px 0; font-size: 12px; color: #059669;">⏰ ${stop.time}</p>
                bounds.push([stop.latitude, stop.longitude]);
            });

            // Draw route line
            if (routeDetail.stops.length > 1) {
                const routeCoordinates = routeDetail.stops.map(stop => [stop.latitude, stop.longitude]);
                L.polyline(routeCoordinates, {
                    color: '#4F46E5',
                    weight: 4,
                    opacity: 0.7
                }).addTo(map);
            }

            // Fit map to show all markers
            if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [routeDetail, isOpen]);

    if (!isOpen) return null;


    // Loading state
    // if (loading) {
    //     return (
    //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //             <div className="bg-white rounded-lg p-8 text-center">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    //                 <p className="mt-4 text-gray-600">Đang tải thông tin tuyến đường...</p>
    //             </div>
    //         </div>
    //     );
    // }

    // // Error state
    // if (error) {
    //     return (
    //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    //             <div className="bg-white rounded-lg p-8 text-center max-w-md">
    //                 <div className="text-red-500 text-5xl mb-4">⚠️</div>
    //                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h3>
    //                 <p className="text-gray-600 mb-4">{error}</p>
    //                 <button
    //                     onClick={onClose}
    //                     className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
    //                 >
    //                     Đóng
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    // No data
    if (!routeDetail) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{routeDetail.name}</h2>
                        <p className="text-indigo-100 text-sm mt-1">Mã tuyến: {routeDetail.route_id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-indigo-700 rounded-full p-2 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content - 2 columns */}
                <div className="grid md:grid-cols-2 h-[calc(90vh-140px)]">
                    {/* Left Side - Route Info */}
                    <div className="border-r overflow-y-auto">
                        {/* Route Summary */}
                        <div className="p-6 bg-gray-50 border-b">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Route className="mr-2 text-indigo-600" size={20} />
                                Thông tin tuyến đường
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-500 text-sm flex items-center">
                                        <MapPin size={16} className="mr-2 text-green-500" />
                                        Điểm đầu
                                    </p>
                                    <p className="font-semibold text-gray-800 mt-1 ml-6">{routeDetail.start}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-500 text-sm flex items-center">
                                        <MapPin size={16} className="mr-2 text-red-500" />
                                        Điểm cuối
                                    </p>
                                    <p className="font-semibold text-gray-800 mt-1 ml-6">{routeDetail.end}</p>
                                </div>
                                {/* <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-sm">Quãng đường</p>
                                        <p className="font-semibold text-indigo-600 mt-1">{routeDetail.distance}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-sm">Thời gian</p>
                                        <p className="font-semibold text-indigo-600 mt-1">{routeDetail.duration}</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Stops List */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <MapPin className="mr-2 text-indigo-600" size={20} />
                                Danh sách trạm ({routeDetail.stops.length} trạm)
                            </h3>
                            <div className="space-y-3">
                                {routeDetail.stops.map((stop, index) => (
                                    <div
                                        key={stop.busstop_id}
                                        className="bg-white border-l-4 border-indigo-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start">
                                            <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800">{stop.stop_name}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{stop.address}</p>
                                                {/* <div className="flex items-center mt-2">
                                                    <Clock size={14} className="text-indigo-500 mr-1" />
                                                    <span className="text-sm text-indigo-700 font-medium">
                                                        {stop.time}
                                                    </span>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Map */}
                    <div className="bg-gray-100 flex flex-col">
                        <div className="p-4 bg-white border-b">
                            <h3 className="text-lg font-semibold flex items-center">
                                <Navigation className="mr-2 text-indigo-600" size={20} />
                                Bản đồ tuyến đường
                            </h3>
                        </div>
                        <div className="flex-1 relative">
                            <div ref={mapRef} className="absolute inset-0 w-full h-full"></div>
                        </div>
                        <div className="p-3 bg-white border-t">
                            <p className="text-xs text-gray-500 text-center">
                                Click vào marker để xem thông tin chi tiết trạm
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RouteDetailModal;
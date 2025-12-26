import { create } from 'zustand';
import { 
  CosmicWeatherData, 
  VisibilityForecast, 
  CelestialEvent, 
  NaturalEvent, 
  Launch, 
  ISSData,
  OrbitPath,
  MapStyle,
  MapLayer,
  UserLocation,
  UserPreferences
} from '@/services/apiTypes';

// ============================================
// Mock Data
// ============================================

const mockCosmicWeather: CosmicWeatherData = {
  solarFlares: [
    {
      flrID: 'FLR-2024-01-15-001',
      instruments: [{ displayName: 'GOES-16' }],
      beginTime: '2024-01-15T08:23:00Z',
      peakTime: '2024-01-15T08:45:00Z',
      endTime: '2024-01-15T09:12:00Z',
      classType: 'M2.1',
      sourceLocation: 'N15W23',
      activeRegionNum: 3536,
      linkedEvents: null
    }
  ],
  geomagneticStorms: [],
  currentKpIndex: 3,
  currentFlareClass: 'M2.1',
  lastUpdated: new Date().toISOString()
};

const mockVisibility: VisibilityForecast = {
  location: 'San Francisco, CA',
  cloudCover: 15,
  visibility: 10000,
  humidity: 45,
  moonPhase: 0.25,
  lightPollution: 'high',
  score: 'good',
  recommendation: 'Clear skies expected. Good conditions for planetary observation.'
};

const mockCelestialEvents: CelestialEvent[] = [
  {
    id: 'evt-001',
    name: 'Quadrantids Meteor Shower',
    type: 'meteor_shower',
    date: '2025-01-03',
    time: '02:00',
    azimuth: 45,
    elevation: 60,
    magnitude: 120,
    duration: '6 hours',
    description: 'One of the best annual meteor showers, producing up to 120 meteors per hour.',
    visibility: 'visible'
  },
  {
    id: 'evt-002',
    name: 'Mars at Opposition',
    type: 'opposition',
    date: '2025-01-16',
    time: '00:00',
    azimuth: 180,
    elevation: 45,
    description: 'Mars will be at its closest approach to Earth and fully illuminated by the Sun.',
    visibility: 'visible'
  },
  {
    id: 'evt-003',
    name: 'Total Lunar Eclipse',
    type: 'eclipse',
    date: '2025-03-14',
    time: '05:30',
    azimuth: 270,
    elevation: 30,
    duration: '3h 20m',
    description: 'The Moon will pass through Earth\'s shadow, turning a deep red color.',
    visibility: 'partial'
  },
  {
    id: 'evt-004',
    name: 'Lyrid Meteor Shower',
    type: 'meteor_shower',
    date: '2025-04-22',
    time: '03:00',
    azimuth: 90,
    elevation: 55,
    magnitude: 20,
    duration: '4 hours',
    description: 'Annual meteor shower with bright meteors and occasional fireballs.',
    visibility: 'visible'
  }
];

const mockNaturalEvents: NaturalEvent[] = [
  {
    id: 'EONET-001',
    title: 'Kilauea Volcano',
    category: 'volcano',
    coordinates: [-155.286, 19.421],
    date: '2025-01-10',
    status: 'active'
  },
  {
    id: 'EONET-002',
    title: 'California Wildfire Complex',
    category: 'wildfire',
    coordinates: [-121.5, 38.5],
    date: '2025-01-08',
    magnitude: 15000,
    status: 'active'
  },
  {
    id: 'EONET-003',
    title: 'Iceland Volcanic Eruption',
    category: 'volcano',
    coordinates: [-22.5, 63.9],
    date: '2025-01-05',
    status: 'active'
  },
  {
    id: 'EONET-004',
    title: 'Australian Bushfire',
    category: 'wildfire',
    coordinates: [149.1, -35.3],
    date: '2025-01-12',
    magnitude: 8500,
    status: 'active'
  }
];

const mockLaunches: Launch[] = [
  {
    id: 'launch-001',
    name: 'Falcon 9 | Starlink Group 6-35',
    status: { id: 1, name: 'Go for Launch', abbrev: 'Go' },
    net: '2025-01-28T14:30:00Z',
    window_start: '2025-01-28T14:30:00Z',
    window_end: '2025-01-28T18:30:00Z',
    launch_service_provider: { id: 121, name: 'SpaceX', type: 'Commercial' },
    rocket: { id: 1, configuration: { name: 'Falcon 9', family: 'Falcon', full_name: 'Falcon 9 Block 5' } },
    mission: { id: 1, name: 'Starlink Group 6-35', description: 'Deployment of Starlink satellites.', type: 'Communications', orbit: { name: 'Low Earth Orbit' } },
    pad: { id: 80, name: 'SLC-40', location: { name: 'Cape Canaveral', country_code: 'USA' } },
    image: null,
    webcast_live: false
  },
  {
    id: 'launch-002',
    name: 'Ariane 6 | Galileo L13',
    status: { id: 2, name: 'TBD', abbrev: 'TBD' },
    net: '2025-02-15T10:00:00Z',
    window_start: '2025-02-15T10:00:00Z',
    window_end: '2025-02-15T12:00:00Z',
    launch_service_provider: { id: 115, name: 'Arianespace', type: 'Commercial' },
    rocket: { id: 2, configuration: { name: 'Ariane 6', family: 'Ariane', full_name: 'Ariane 64' } },
    mission: { id: 2, name: 'Galileo L13', description: 'European navigation satellite deployment.', type: 'Navigation', orbit: { name: 'Medium Earth Orbit' } },
    pad: { id: 180, name: 'ELA-4', location: { name: 'Kourou', country_code: 'GUF' } },
    image: null,
    webcast_live: false
  },
  {
    id: 'launch-003',
    name: 'Falcon Heavy | Europa Clipper',
    status: { id: 3, name: 'Success', abbrev: 'Success' },
    net: '2024-10-14T16:06:00Z',
    window_start: '2024-10-14T16:06:00Z',
    window_end: '2024-10-14T16:06:00Z',
    launch_service_provider: { id: 121, name: 'SpaceX', type: 'Commercial' },
    rocket: { id: 3, configuration: { name: 'Falcon Heavy', family: 'Falcon', full_name: 'Falcon Heavy' } },
    mission: { id: 3, name: 'Europa Clipper', description: 'Mission to study Jupiter\'s moon Europa.', type: 'Planetary Science', orbit: { name: 'Heliocentric' } },
    pad: { id: 87, name: 'LC-39A', location: { name: 'Kennedy Space Center', country_code: 'USA' } },
    image: null,
    webcast_live: false
  }
];

const mockISSData: ISSData = {
  id: 'ISS',
  name: 'International Space Station',
  latitude: 28.5,
  longitude: -80.6,
  altitude: 420,
  velocity: 7.66,
  timestamp: new Date().toISOString(),
  crew: [
    { name: 'Oleg Kononenko', nationality: 'Russia' },
    { name: 'Nikolai Chub', nationality: 'Russia' },
    { name: 'Tracy Dyson', nationality: 'USA' },
    { name: 'Matthew Dominick', nationality: 'USA' },
    { name: 'Michael Barratt', nationality: 'USA' },
    { name: 'Jeanette Epps', nationality: 'USA' },
    { name: 'Alexander Grebenkin', nationality: 'Russia' }
  ],
  orbitNumber: 12847,
  visibility: 'not_visible'
};

// Generate mock orbit path
const generateOrbitPath = (): OrbitPath => {
  const path: Array<{ lat: number; lng: number; time: string }> = [];
  const now = Date.now();
  
  for (let i = 0; i < 100; i++) {
    const progress = i / 100;
    const lng = ((progress * 360 * 2) % 360) - 180;
    const lat = Math.sin(progress * Math.PI * 4) * 51.6;
    path.push({
      lat,
      lng,
      time: new Date(now + i * 60000).toISOString()
    });
  }
  
  return { satelliteId: 'ISS', path };
};

// ============================================
// Store Definition
// ============================================

interface SpaceState {
  // Data
  cosmicWeather: CosmicWeatherData;
  visibility: VisibilityForecast;
  celestialEvents: CelestialEvent[];
  naturalEvents: NaturalEvent[];
  launches: Launch[];
  issData: ISSData;
  issOrbitPath: OrbitPath;
  
  // UI State
  mapStyle: MapStyle;
  activeLayers: MapLayer[];
  selectedEvent: NaturalEvent | null;
  selectedLaunch: Launch | null;
  sidebarOpen: boolean;
  activePanel: 'events' | 'missions' | 'satellites' | 'weather' | null;
  
  // User
  userPreferences: UserPreferences;
  
  // Loading states
  isLoading: {
    weather: boolean;
    events: boolean;
    launches: boolean;
    satellites: boolean;
  };
  
  // Actions
  setMapStyle: (style: MapStyle) => void;
  toggleLayer: (layerId: string) => void;
  setSelectedEvent: (event: NaturalEvent | null) => void;
  setSelectedLaunch: (launch: Launch | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setActivePanel: (panel: SpaceState['activePanel']) => void;
  setUserLocation: (location: UserLocation) => void;
  updateISSPosition: () => void;
  filterEventsByCategory: (category: NaturalEvent['category'] | 'all') => NaturalEvent[];
}

export const useSpaceStore = create<SpaceState>((set, get) => ({
  // Initial Data (Mock)
  cosmicWeather: mockCosmicWeather,
  visibility: mockVisibility,
  celestialEvents: mockCelestialEvents,
  naturalEvents: mockNaturalEvents,
  launches: mockLaunches,
  issData: mockISSData,
  issOrbitPath: generateOrbitPath(),
  
  // UI State
  mapStyle: 'dark',
  activeLayers: [
    { id: 'satellite', name: 'Satellite View', type: 'base', visible: false, opacity: 1 },
    { id: 'weather', name: 'Weather Overlay', type: 'overlay', visible: false, opacity: 0.6 },
    { id: 'iss', name: 'ISS Tracker', type: 'overlay', visible: true, opacity: 1 },
    { id: 'events', name: 'Natural Events', type: 'overlay', visible: true, opacity: 1 }
  ],
  selectedEvent: null,
  selectedLaunch: null,
  sidebarOpen: true,
  activePanel: 'events',
  
  // User Preferences
  userPreferences: {
    location: null,
    units: 'metric',
    theme: 'dark',
    notifications: {
      launches: true,
      celestialEvents: true,
      issPass: true
    }
  },
  
  // Loading States
  isLoading: {
    weather: false,
    events: false,
    launches: false,
    satellites: false
  },
  
  // Actions
  setMapStyle: (style) => set({ mapStyle: style }),
  
  toggleLayer: (layerId) => set((state) => ({
    activeLayers: state.activeLayers.map(layer =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    )
  })),
  
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setSelectedLaunch: (launch) => set({ selectedLaunch: launch }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  
  setUserLocation: (location) => set((state) => ({
    userPreferences: { ...state.userPreferences, location }
  })),
  
  updateISSPosition: () => {
    const state = get();
    const newLng = (state.issData.longitude + 0.5) % 360;
    const newLat = Math.sin((newLng / 180) * Math.PI) * 51.6;
    
    set({
      issData: {
        ...state.issData,
        longitude: newLng > 180 ? newLng - 360 : newLng,
        latitude: newLat,
        timestamp: new Date().toISOString()
      }
    });
  },
  
  filterEventsByCategory: (category) => {
    const state = get();
    if (category === 'all') return state.naturalEvents;
    return state.naturalEvents.filter(event => event.category === category);
  }
}));

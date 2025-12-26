// ============================================
// SpaceScope API Type Definitions
// ============================================

// --------------------------------------------
// NASA DONKI (Space Weather) Types
// --------------------------------------------
export interface SolarFlare {
  flrID: string;
  instruments: Array<{ displayName: string }>;
  beginTime: string;
  peakTime: string;
  endTime: string;
  classType: string; // e.g., "M1.2", "X2.1"
  sourceLocation: string;
  activeRegionNum: number;
  linkedEvents: Array<{ activityID: string }> | null;
}

export interface GeomagneticStorm {
  gstID: string;
  startTime: string;
  allKpIndex: Array<{
    observedTime: string;
    kpIndex: number; // 0-9 scale
    source: string;
  }>;
  linkedEvents: Array<{ activityID: string }> | null;
}

export interface CosmicWeatherData {
  solarFlares: SolarFlare[];
  geomagneticStorms: GeomagneticStorm[];
  currentKpIndex: number;
  currentFlareClass: string | null;
  lastUpdated: string;
}

// --------------------------------------------
// OpenWeather Types
// --------------------------------------------
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  coord: { lon: number; lat: number };
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  visibility: number;
  clouds: { all: number }; // Cloud coverage percentage
  wind: { speed: number; deg: number };
  dt: number;
  sys: { sunrise: number; sunset: number };
  name: string;
}

export interface VisibilityForecast {
  location: string;
  cloudCover: number; // 0-100%
  visibility: number; // meters
  humidity: number;
  moonPhase: number; // 0-1
  lightPollution: 'low' | 'medium' | 'high';
  score: 'excellent' | 'good' | 'fair' | 'poor';
  recommendation: string;
}

// --------------------------------------------
// Astronomy API Types
// --------------------------------------------
export interface CelestialEvent {
  id: string;
  name: string;
  type: 'meteor_shower' | 'eclipse' | 'conjunction' | 'opposition' | 'transit';
  date: string;
  time: string;
  azimuth: number; // 0-360 degrees
  elevation: number; // -90 to 90 degrees
  magnitude?: number;
  duration?: string;
  description: string;
  visibility: 'visible' | 'partial' | 'not_visible';
}

export interface CelestialBody {
  name: string;
  altitude: number;
  azimuth: number;
  distance: number;
  magnitude: number;
  rise: string;
  set: string;
  transit: string;
}

// --------------------------------------------
// NASA EONET (Earth Observatory Natural Event Tracker) Types
// --------------------------------------------
export interface EONETCategory {
  id: string;
  title: string;
}

export interface EONETGeometry {
  magnitudeValue: number | null;
  magnitudeUnit: string | null;
  date: string;
  type: 'Point' | 'Polygon';
  coordinates: [number, number] | [number, number][];
}

export interface EONETEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: string | null;
  categories: EONETCategory[];
  sources: Array<{ id: string; url: string }>;
  geometry: EONETGeometry[];
}

export interface EONETResponse {
  title: string;
  description: string;
  link: string;
  events: EONETEvent[];
}

// Simplified event for UI
export interface NaturalEvent {
  id: string;
  title: string;
  category: 'wildfire' | 'volcano' | 'earthquake' | 'storm' | 'flood' | 'iceberg';
  coordinates: [number, number];
  date: string;
  magnitude?: number;
  status: 'active' | 'closed';
}

// --------------------------------------------
// SpaceDevs API Types (Launches)
// --------------------------------------------
export interface LaunchServiceProvider {
  id: number;
  name: string;
  type: string;
}

export interface Rocket {
  id: number;
  configuration: {
    name: string;
    family: string;
    full_name: string;
  };
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  type: string;
  orbit: { name: string } | null;
}

export interface LaunchPad {
  id: number;
  name: string;
  location: {
    name: string;
    country_code: string;
  };
}

export interface Launch {
  id: string;
  name: string;
  status: {
    id: number;
    name: string; // "Go for Launch", "TBD", "Success", "Failure"
    abbrev: string;
  };
  net: string; // NET (No Earlier Than) datetime
  window_start: string;
  window_end: string;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission | null;
  pad: LaunchPad;
  image: string | null;
  webcast_live: boolean;
}

export interface LaunchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Launch[];
}

// --------------------------------------------
// Satellite Tracking Types (TLE-based)
// --------------------------------------------
export interface TLEData {
  satelliteId: number;
  name: string;
  line1: string;
  line2: string;
}

export interface SatellitePosition {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number; // km
  velocity: number; // km/s
  timestamp: string;
}

export interface ISSData extends SatellitePosition {
  crew: Array<{ name: string; nationality: string }>;
  orbitNumber: number;
  visibility: 'visible' | 'not_visible';
  nextPass?: {
    rise: string;
    maxAltitude: number;
    set: string;
  };
}

export interface OrbitPath {
  satelliteId: string;
  path: Array<{ lat: number; lng: number; time: string }>;
}

// --------------------------------------------
// Map Layer Types
// --------------------------------------------
export type MapStyle = 'satellite' | 'dark' | 'light' | 'terrain';

export interface MapLayer {
  id: string;
  name: string;
  type: 'base' | 'overlay';
  visible: boolean;
  opacity: number;
}

export interface MapMarker {
  id: string;
  type: 'iss' | 'wildfire' | 'volcano' | 'storm' | 'launch_site';
  coordinates: [number, number];
  label: string;
  data?: Record<string, unknown>;
}

// --------------------------------------------
// User Preferences
// --------------------------------------------
export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface UserPreferences {
  location: UserLocation | null;
  units: 'metric' | 'imperial';
  theme: 'dark' | 'light' | 'system';
  notifications: {
    launches: boolean;
    celestialEvents: boolean;
    issPass: boolean;
  };
}

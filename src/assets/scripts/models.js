/* ==================================================================================
Models
This file is used to build data models for data received from API calls
================================================================================== */

/**
 * Represents each event in samples
 */
class Event {
    constructor(eventType, millisecondOffset, values) {
        this.eventType = eventType
        this.millisecondOffset = millisecondOffset
        this.values = new EventValues(values.heartRate, values.cadence, values.power, values.temperature, values.elevation, values.distance, values.speed, values.positionLat, values.positionLong)
    }
}

/**
 * Represents the properties of each event
 */
class EventValues {
    constructor(heartRate, cadence, power, temperature, elevation, distance, speed, positionLat, positionLong) {
        this.heartRate = heartRate
        this.cadence = cadence
        this.power = power
        this.temperature = temperature
        this.elevation = elevation
        this.distance = distance
        this.speed = speed
        this.positionLat = positionLat
        this.positionLong = positionLong
    }
}

/**
 * Represents the data object of the graph's dataset
 */
class ChartData {
    constructor(label, events, channel) {
        this.label = label
        this.backgroundColor = 'rgb(52,165,216, .5)'
        this.data = events.map(d => new ChartDataPoint(d.millisecondOffset, d.values[channel]))
    }
}

/**
 * Represents each point on graph
 */
class ChartDataPoint {
    constructor(x, y) {
        this.x = x == undefined ? 0 : x
        this.y = typeof y == "undefined" ? 0 : y
    }
}

/**
 * Represents the lattiude and longitude of each point on map
 */
class PositionPoint {
    constructor(lat, long) {
        this.lat = lat
        this.lng = long
    }
}

export { Event, ChartDataPoint, ChartData, PositionPoint }
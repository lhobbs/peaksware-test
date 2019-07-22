/* ==================================================================================
Services
This file is used to call APIs using the data-access.js file and will construct
JavaScript classes based on data returned.
================================================================================== */
import dataAccess from './data-access'
import { Event, ChartData, PositionPoint } from './models'

export class Services {
  constructor(rootUrl) {
      this._da = dataAccess(rootUrl)
  }

  /**
   * Returns all workout events
   */
 getEvents() {
    return this._da.events.getEvents().events.map(e => new Event(e.eventType, e.millisecondOffset, e.values))
  }

  /**
   * Returns channel set
   */
  getChannelSet() {
    return this._da.configs.getChannelSet().channelSet
  }

  /**
   * Returns data object for chart
   * @param {string} channel    Selected channel determines which property to use
   * @param {array} events      Array of events to use 
   */
  getChartDataPoints(channel, events) {
      return new ChartData(channel.toUpperCase(), events, channel)
  }


  /**
   * Returns chart data object for graph
   * @param {string} channel    Selected channel determins which property to use
   */
  getChartData(channel) {
    let events = this.getEvents();
    let labels = this.setGraphLabels(events);
    let datasets = [this.getChartDataPoints(channel, events)];
    return {
      labels,
      datasets
    }
  }

  /**
   * set labels for x-axis of graph
   *  @param {array} events   Array of events to use to get incremental labels
  */
  setGraphLabels(events) {
    // limit number of labels to make graph more readable
    let labelsLength = 100
    // get end time of all events
    let endTime = events[events.length-1].millisecondOffset;
    // divide total time by 100 to get increment value 
    let incr = endTime/labelsLength;
    // set chart labels for each 100th of total time
    return Array.from(Array(labelsLength), (_,x) => (x * incr )/(1000 * 60));
  }

  /**
   * Returns lat and lng of workout path
   */
  getPath() {
    var events = this.getEvents();
    // only return events with position
    var path = events.filter(e => e.values.positionLat && e.values.positionLong)
    return path.map(e => new PositionPoint(e.values.positionLat, e.values.positionLong))
  }

  /**
   * Returns lat and lng of selected path
   * @param {number} start      Start time in milliseconds of selected path
   * @param {number} end        End time in milliseconds of selected path
   */
  getPathForTime(start, end) {
    var events = this.getEvents();
    // only return events with position
    var path = events.filter(e => e.values.positionLat && e.values.positionLong && e.millisecondOffset >= start && e.millisecondOffset <= end)
    return path.map(e => new PositionPoint(e.values.positionLat, e.values.positionLong))
  }

  /**
   * Returns the highest average 
   * @param {number} minutes    Number of minutes for timespan of "best"
   * @param {string} channel    Channel determines which property to use for calculation
   */
  getBestAverage(minutes, channel) {
    // get all events
    let events = this.getEvents();

    //convert time to milliseconds
    let timeframe = minutes * 60 * 1000; 

    // initalize data
    let startTime = 0
    let endTime = timeframe;
    let currentTotal = 0
    let bestStartIndex = 0
    let highestTotal = 0

    // object to be returned
    let best = {
      startTime,
      endTime,
      total : 0,
      average : 0
    }

    for(let i = 0; i < events.length; i++ ){
      // check that event is still within timeframe
      if (events[i].millisecondOffset >= startTime && events[i].millisecondOffset <= endTime) {
        currentTotal += events[i].values[channel];

        // determine if current total is greater than best
        if (currentTotal > highestTotal) {
          highestTotal = currentTotal
        }
      }
      else {
        best = {
          startTime : startTime / (1000 * 60), // convert time to minutes
          endTime : endTime / (1000 * 60),
          total : highestTotal,
          average : highestTotal/timeframe
        }

        // set next timeframe
        bestStartIndex += 1
        startTime = events[bestStartIndex].millisecondOffset
        endTime = startTime + timeframe

      }
    }

    return best
  }

}
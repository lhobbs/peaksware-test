/* ==================================================================================
Data Access
This file is used to create methods to call APIs
================================================================================== */
import json from './../../../workout-data.json'

export default function() {
  return {

    events: {
      /**
       * Returns all workout events from json file
       */
        getEvents: () => {
            return {
                events: json.samples
            }
        }
    },

    configs: {
      /**
       * Returns channel set list from json file
       */
      getChannelSet: () => {
        return {
          channelSet: json.channelSet
        }
      }
    }
  }
}
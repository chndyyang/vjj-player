/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 package org.mangui.osmf.plugins.traits {
    import org.mangui.hls.HLS;
    import org.mangui.hls.event.HLSEvent;
    import org.osmf.traits.DynamicStreamTrait;
    import org.osmf.utils.OSMFStrings;
    
    if(false) {
    import org.mangui.hls.utils.Log;
    }

    public class HLSDynamicStreamTrait extends DynamicStreamTrait {
        private var _hls : HLS;

        public function HLSDynamicStreamTrait(hls : HLS) {
            if(false) {
            Log.debug("HLSDynamicStreamTrait()");
            }
            _hls = hls;
            _hls.addEventListener(HLSEvent.LEVEL_SWITCH, _levelSwitchHandler);
            super(true, _hls.startlevel, hls.levels.length);
        }

        override public function dispose() : void {
            if(false) {
            Log.debug("HLSDynamicStreamTrait:dispose");
            }
            _hls.removeEventListener(HLSEvent.LEVEL_SWITCH, _levelSwitchHandler);
            super.dispose();
        }

        override public function getBitrateForIndex(index : int) : Number {
            if (index > numDynamicStreams - 1 || index < 0) {
                throw new RangeError(OSMFStrings.getString(OSMFStrings.STREAMSWITCH_INVALID_INDEX));
            }
            var bitrate : Number = _hls.levels[index].bitrate / 1000;
            if(false) {
            Log.debug("HLSDynamicStreamTrait:getBitrateForIndex(" + index + ")=" + bitrate);
            }
            return bitrate;
        }

        override public function switchTo(index : int) : void {
            if(false) {
            Log.debug("HLSDynamicStreamTrait:switchTo(" + index + ")/max:" + maxAllowedIndex);
            }
            if (index < 0 || index > maxAllowedIndex) {
                throw new RangeError(OSMFStrings.getString(OSMFStrings.STREAMSWITCH_INVALID_INDEX));
            }
            autoSwitch = false;
            if (!switching) {
                setSwitching(true, index);
            }
        }

        override protected function autoSwitchChangeStart(value : Boolean) : void {
            if(false) {
            Log.debug("HLSDynamicStreamTrait:autoSwitchChangeStart:" + value);
            }
            if (value == true && _hls.autolevel == false) {
                _hls.level = -1;
                // only seek if position is set
                if (!isNaN(_hls.position)) {
                    _hls.stream.seek(_hls.position);
                }
            }
        }

        override protected function switchingChangeStart(newSwitching : Boolean, index : int) : void {
            if(false) {
            Log.debug("HLSDynamicStreamTrait:switchingChangeStart(newSwitching/index):" + newSwitching + "/" + index);
            }
            if (newSwitching) {
                _hls.level = index;
            }
        }

        /** Update playback position/duration **/
        private function _levelSwitchHandler(event : HLSEvent) : void {
            var newLevel : int = event.level;
            if(false) {
            Log.debug("HLSDynamicStreamTrait:_qualitySwitchHandler:" + newLevel);
            }
            setCurrentIndex(newLevel);
            setSwitching(false, newLevel);
        };
    }
}
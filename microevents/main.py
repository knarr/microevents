#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import datetime
import cgi

from google.appengine.ext import ndb
from google.appengine.api import users

microevents_key = ndb.Key('Microevents', 'default')

class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('''<!DOCTYPE html>
<html lang="en">
<head>

<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false">
</script>

<script>
function initialize()
{
var mapProp = {
  center:new google.maps.LatLng(41.8265,-71.4032),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
var map=new google.maps.Map(document.getElementById("googleMap")
  ,mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);
</script>

</head>
<body>
<!-- container -->
<div class="container">


	<a  id="wait">i'm waaaitinggg <span></span></a>
      <!-- GEOLOCATION-->
      <div id="locate" class="row">
        <div class="twelve columns">
          <form id="locationBar" action="javascript:codeAddress()">
            <div id="error">you don't really want to go that far. try again</div>
            <input id="location" placeholder="tell me where you are" type="text">
            <input type="submit" class="submit" value="i'll find you something to do">
            <p><input id="distsance" placeholder="how far ru willing to go" type="text">
            <input type="submit" class="submit" value="pls"></p>
          </form>
        </div>
      </div>
      <!--RECOMMENDATION-->
      <div id="recommendation" class="row">
        <div class="twelve columns"> <span id="destination"></span>
          <div id="mapcontainer">
            <div id="address"></div>
            <div id="map"></div>
          </div>
        </div>
      </div>

      <div id="googleMap" style="width:500px;height:380px;"></div>

      <!--ACTIONS-->


    </div>


</div>
<!-- MAPS -->
<script src="https://maps.googleapis.com/maps/api/js?v=3&libraries=places,adsense&sensor=true&key=AIzaSyCTxiWhuS0yb-zBc11xjfNlFubjdYkZtp8" type="text/javascript"></script>
<!-- G+ -->
<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>

<!-- Included JS Files -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>''')


app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)

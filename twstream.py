from twython import TwythonStreamer

class TWStreamer(TwythonStreamer):
    def on_success(self, data):
        if 'text' in data:
            print data['text']

    def on_error(self, status_code, data):
        print status_code, data


APP_KEY = 'UQVGvAiVnMSJpqdefj44Jw'
# Acess token generated by twauth.py and hard coded in
ACCESS_TOKEN = 'AAAAAAAAAAAAAAAAAAAAABRMVwAAAAAAnE6%2F41mZ20HV2LVadOufnqih%2Fc8%3DAP8Dhd8DkaKCFhJ1Nn7ZedG5TmU54dRJ865U26ByLgU0oIlkuo'

        
stream = TWStreamer(APP_KEY, ACCESS_TOKEN)

stream.statuses.filter(track='twitter')

from twython import Twython

APP_KEY = 'UQVGvAiVnMSJpqdefj44Jw'
APP_SECRET = 'b6umv07DoBcqswtRu14NhwbV6Pq9CprHTjQKnReUTo'

twitter = Twython(APP_KEY, APP_SECRET, oauth_version=2)
ACCESS_TOKEN = twitter.obtain_access_token()

print(ACCESS_TOKEN)

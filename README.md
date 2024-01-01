![hayasakastream-high-resolution-logo-transparent](https://github.com/himanshu8443/HayasakaStream/assets/99420590/cd114cbd-eff2-491e-955a-325f3ee8f468)

 - Api provides Movies/Series streaming links by IMDB IDs.
 - Most commonly provided languages - Hindi, English, Tamil, Telugu, Bengali.
 
## Note 
Don't use Api provided for trying as its is rate limited and hosted very low powered machine(on render) so have bad response time. But, you can Deploy your instance.

#  Documentation
## Get media Info
Provides information about movie/series which includes

 - totalSeasons -  total avaiable seasons (0 for movies).
 - totalEpisodesS1 - total avaiable Episodes in Season 1 (0 for movies).
 - languages - avaiable languages array.
 
**Endpoint** - `/api/v1/mediaInfo?id=tt1190634`

**Response** - 
```bash
{
    "success": true,
    "data": {
        "totalSeasons": 3,
        "totalEpisodesS1": 8,
        "languages": [
            "Hindi",
            "English"
        ]
    }
}
```

**Link** - [try](https://hayasaka-stream.onrender.com/api/v1/mediaInfo?id=tt1190634)

|Query|Description  |
|--|--|
|id|IMDB ID of movie/series

## Get total episodes
Provides total avaiable episodes in season.

**Endpoint** - `/api/v1/getEpisodes?id=tt1190634&season=2&lang=1`

**Response** - 
```bash
{
    "success": true,
    "data": {
        "totalEpisodes": 8
    }
}
```

**Link** -  [try](https://hayasaka-stream.onrender.com/api/v1/getEpisodes?id=tt1190634&season=2&lang=5)

|Query|Description  | required
|--|--| --|
|id|IMDB ID of movie/series  |true
|season|Season number|true
|lang|Language ID (get from media info)|optional, default=Ist lang

## Get Stream
Provides stream link.
**Endpint** - `/api/v1/getStream?id=tt1190634&season=1&episode=4&lang=1`

**Response** - 
```bash
{
    "success": true,
    "data": {
        "StreamLink": "https://i-cdn-0.esh-bostewsom-i-273.site/stream2/i-cdn-0/5dbfd06abb47939136d00ae64c3fd2a1/MJTMsp1RshGTygnMNRUR2N2MSlnWXZEdMNDZzQWe5MDZzMmdZJTO1R2RWVHZDljekhkSsl1VwYnWtx2cihVT2p1VRlXTEpEaZRFar1kMNdnWXVUMOJjWp90RZBjT6tWNOJTWw40VKxWTyEVP:1704097846:42.105.75.152:44c0da99f4017925dceb5db7a6392941801f9c6273748c401bf12238b0adfd68/index.m3u8"
    }
}
```

**Link** - [try](https://hayasaka-stream.onrender.com/api/v1/getStream?id=tt1190634&season=1&episode=4&lang=1)

|Query|Description  | required
|--|--| --|
|id|IMDB ID of movie/series  |true
|season|Season number|optional, default=1
|lang|Language ID (get from media info)|optional, default=Ist lang
|episode|Episode number|optional, default=1

# Installation
  ```
   git clone https://github.com/himanshu8443/HayasakaStream.git
  ```

 ```
  cd HayasakaStream
```
 ### node
  ```
   npm install
   npm run build
   npm run start
```
   
###  docker
```
docker build -t HayasakaStream .
```
```
docker run -p 3000:3000 -it -d HayasakaStream
```




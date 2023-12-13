import { google } from 'googleapis';

const { OAuth2 } = google.auth;
const { YouTube } = google.youtube_v3;

async function getYouTubeClient(credentials) {
  const oAuth2Client = new OAuth2(
    credentials.client_id,
    credentials.client_secret,
    'https://developers.google.com/oauthplayground'
  );
  oAuth2Client.setCredentials({ refresh_token: credentials.refresh_token });
  return new YouTube({ auth: oAuth2Client });
}

export default async function uploadVideo(filePath, videoTitle, videoDescription) {
  const client = await getYouTubeClient(JSON.parse(fs.readFileSync('credentials.json', 'utf-8')));
  
  const response = await client.videos.insert({
    part: 'snippet',
    requestBody: {
      snippet: {
        title: videoTitle,
        description: videoDescription,
      }
    },
    onUploadProgress: (event) => {
      console.log('Upload progress:', event.bytesRead, '/', event.bytesTotal);
    }
  });

  return response.data.id;
}

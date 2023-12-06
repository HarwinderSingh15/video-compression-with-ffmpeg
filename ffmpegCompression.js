import RNFetchBlob from 'rn-fetch-blob';
import { FFmpegKit, FFmpegKitConfig } from 'ffmpeg-kit-react-native';

const compressWithFFMpeg = async (
  imagePath,
  fileName,
  progressCb,
  successCb
) => {
  const currentFileName = fileName;
  // First FFmpeg command
  const documentDir = RNFetchBlob.fs.dirs.DocumentDir;
  FFmpegKit.executeAsync(
    `-i ${imagePath} -c:v libx264 -crf 30 -preset faster -r 30 -b:v 2M -movflags +faststart ${documentDir}/${currentFileName}.mp4`,
    session => {
      successCb(true, currentFileName);
    },
    logs => {},
    stats => {
      const statsTime = stats.getTime();
      progressCb(statsTime);
    }
  );
};

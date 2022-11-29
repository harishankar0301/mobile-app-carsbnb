import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

export function usePhotoGallery() {

    const savePicture = async (photo) => {
        const savedFile = await fetch(photo.webPath);
        const savedFileBlob = await savedFile.blob();
        return savedFileBlob;
    };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = new Date().getTime() + ".png";
    const savedFileImage = await savePicture(photo);
  };

  return {
    takePhoto,
  };
}

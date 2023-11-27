import { Button, Image } from "@nextui-org/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { UploadButton } from "~/utils/uploadthing";

export default function ImageUploader() {
  const { control, watch, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "images",
  });

  console.log(watch());

  return (
    <div>
      {fields.map((image, index) => (
        <div>
          <Image
            key={image.id}
            src={`https://utfs.io/f/${getValues(`images.${index}`)}`}
          />
          <Button
            onClick={() => {
              remove(index);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
      <UploadButton
        endpoint="recipeImagesUploader"
        onClientUploadComplete={(res) => {
          res.forEach((file) => {
            console.log(file);
            append(file.key);
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

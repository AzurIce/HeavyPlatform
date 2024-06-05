import { Add, Delete } from "@suid/icons-material";
import { Box } from "@suid/material";
import { Component, For, JSX, Signal } from "solid-js";

const ImgBox: Component<{ children?: JSX.Element, onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> }> = (props) => {
  const { onClick } = props;
  return <>
    <Box sx={[{
      width: 60, height: 60,
      border: 1, borderColor: "#aaaaaa", borderRadius: 2,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative",
    }, {
      '&:hover': {
        borderColor: "#777777"
      }
    }]} onClick={onClick}>
      {props.children}
    </Box>
  </>
}

const ImgInput: Component<{ imgs: Signal<string[]> }> = (props) => {
  const { imgs } = props;
  const [getImgs, setImgs] = imgs;

  const encodeFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setImgs([...getImgs(), base64String]);
    };
    reader.readAsDataURL(file);
  }

  const removeImage = (index: number) => {
    setImgs(getImgs().filter((_, i) => i !== index));
  }

  return <>
    <div class="flex flex-wrap gap-2">
      <For each={getImgs()}>{(img, index) =>
        <>
          <ImgBox onClick={() => removeImage(index())}>
            <div class="absolute inset-0 flex justify-center items-center z-10 opacity-0 hover:opacity-50 bg-[#bbbbbb] cursor-pointer">
              <Delete />
            </div>
            <img src={img} alt="img" class="w-full" />
          </ImgBox>
        </>
      }</For>
      <ImgBox onClick={() => { }}>
        <input
          aria-label="select image"
          type="file"
          name="attachment"
          onChange={(event) => {
            // console.log(event.target.files)

            for (const file of event.target.files || []) {
              if (file.type.startsWith("image")) {
                encodeFile(file);
              }
            }
            // setImgs([...imgs, ...event.target.files])
          }}
          class="absolute inset-0 opacity-0 hover:cursor-pointer"
          multiple
          required
        />
        <Add sx={{ color: "#777777" }} />
      </ImgBox>
    </div>
  </>
}

export default ImgInput;
import { Apps } from "@suid/icons-material";
import { Box, IconButton, InputAdornment, Popover, TextField } from "@suid/material";
import { createEffect } from "solid-js";
import { Accessor } from "solid-js";
import { createSignal } from "solid-js";
import { Component } from "solid-js";
import { For } from "solid-js";
import { Icon } from '@iconify-icon/solid';
import { Trie } from "../lib/trie";
import { searchIcons } from "../lib/store";
import { Setter } from "solid-js/types/reactive/signal";

export const IconInput: Component<{ icon: Accessor<string>, setIcon: Setter<string> }> = (props) => {
  const { icon, setIcon } = props;

  // Popup
  const [anchorEl, setAnchorEl] = createSignal<HTMLButtonElement | null>(null);
  const onChooseIcon = (
    event: MouseEvent & { currentTarget: HTMLButtonElement }
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const open = () => Boolean(anchorEl());
  const id = () => (open() ? "simple-popover" : undefined);

  const [search, setSearch] = createSignal("");
  const icons = () => searchIcons(search());

  // chunk to avoid flex-wrap glitching
  const chunkSize = 6;
  const chunked_icons = () => Array.from(
    { length: Math.ceil(icons().length / chunkSize) },
    (_, i) => icons().slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return <>
    <TextField
      size='small'
      label="图标"
      value={icon()}
      onChange={(_event, value) => {
        setIcon(value)
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start"><Icon icon={`tabler:${icon()}`} /></InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onChooseIcon}
              edge="end"
            >
              <Apps />
            </IconButton>
          </InputAdornment>
        )
      }} />
    <Popover
      id={id()}
      open={open()}
      anchorEl={anchorEl()}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 220,
          maxHeight: 200,
          padding: 2,
          position: "relative",
          gap: 2,
        }}
      >
        <TextField size="small" value={search()} onChange={(e, v) => setSearch(v)} />
        <div class="flex flex-col overflow-y-scroll h-[100px]">
          <For each={chunked_icons()}>{(item) => {
            return <div class="flex">
              <For each={item}>{(item) => {
                return <>
                  <IconButton onClick={() => {
                    setIcon(item)
                    handleClose();
                  }}>
                    <Icon icon={`tabler:${item}`} height={20} />
                  </IconButton>
                </>
              }}
              </For>
            </div>
          }}
          </For>
        </div>

      </Box>
    </Popover>
  </>
}

export default IconInput;
import { Box, Button, Modal, Typography, useTheme } from "@suid/material";
import { Accessor, JSXElement, Signal, createSignal } from "solid-js";

export const DeleteButton = <T extends { id: number },>(
  name: string,
  deleteApi: (id: number) => Promise<void>,
  onRevalidate: (id: number) => void
) => (props: { target: Accessor<T>, then?: () => void, children?: JSXElement, disabled?: Accessor<boolean> }) => {
  const { target, then, children, disabled } = props

  const targetSignal = createSignal<T | undefined>()
  const [_, setTarget] = targetSignal;

  const ConcreteDeleteModal = DeleteModal<T>(name, deleteApi, onRevalidate);

  return <>
    <ConcreteDeleteModal target={targetSignal} then={then} />
    <Button color="error" onClick={() => setTarget(target)} disabled={disabled ? disabled() : false}>{children ? children : "删除"}</Button>
  </>
}

export const DeleteModal = <T extends { id: number },>(
  name: string,
  deleteApi: (id: number) => Promise<void>,
  onRevalidate: (id: number) => void
) => (props: { target: Signal<T | undefined>, then?: () => void }) => {
  const theme = useTheme();
  const [target, setTarget] = props.target
  const then = props.then ? props.then : () => { };

  const onDelete = () => {
    deleteApi(target()!.id).then((res) => {
      onRevalidate(target()!.id)
      onCancel()
      then()
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
    })
  }

  const onCancel = () => {
    setTarget()
  }

  return <>
    <Modal
      open={target() != undefined}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: "60%",
          maxWidth: "1000px",
          bgcolor: theme.palette.background.paper,
          boxShadow: "24px",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          删除{name}
        </Typography>

        <div class='flex flex-col gap-2'>
          确定要删除该{name}嘛？
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onDelete}>确定</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}
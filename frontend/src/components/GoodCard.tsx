import { Component } from 'solid-js';
import { createAsync, useNavigate } from "@solidjs/router";
import { getGood, isMobile } from '../lib/store';
import { Box, Card, CardMedia, Typography, useTheme } from '@suid/material';

export const GoodCard: Component<{ id: number }> = (props) => {
  const { id } = props;
  const good = createAsync(() => getGood(id))
  const navigate = useNavigate()
  const theme = useTheme()

  const handleCardClick = () => {
    navigate(`/goods/${id}`)
  }

  return <>
    <Card
      elevation={1}
      sx={{
        flex: "1 0 160px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "200px",
        transition: "background-color 0.3s ease",
        borderRadius: '8px',
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#eeeeee", // 灰色背景
        }
      }}
      onClick={handleCardClick}
    >
      <Box sx={{
        width: '100%',
        height: isMobile() ? 180 : 180,
        backgroundColor: theme.palette.background.paper,
      }}>
        <CardMedia component="img"
          src={good()?.imgs[0]} alt="good-img"
          sx={{ maxWidth: '100%', maxHeight: '100%', flexGrow: 1 }}
        />
      </Box>
      <div class='p-2 box-border flex flex-col w-full'>
        <div class='flex gap-2'>
          <span class='truncate'>{good()?.name}</span>
          <span class='text-xs text-[#999999] min-w-6'>id: {good()?.id}</span>
        </div>
        <span class='text-red text-lg'>¥{good()?.price}</span>
      </div>
    </Card>
  </>
}

export default GoodCard
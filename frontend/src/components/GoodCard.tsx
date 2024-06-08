import { Component } from 'solid-js';
import { createAsync, useNavigate } from "@solidjs/router";
import { getGood } from '../lib/store';
import { Card, CardMedia, Typography } from '@suid/material';

export const GoodCard: Component<{id: number}> = (props) => {
  const { id } = props;
  const good = createAsync(() => getGood(id))
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/goods/${id}`)
  }

  return <>
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        alignItems: "center",
        minHeight: "200px",
        transition: "background-color 0.3s ease",
        border: 'solid 2px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#eeeeee", // 灰色背景
        }
      }}
      onClick={handleCardClick}
    >
      <CardMedia component="img" src={good()?.imgs[0]} alt="good-img" sx={{ width: '90%' }} />
      <div class="flex flex-col flex-1">
        <div class="flex gap-2">
          <span class="font-bold text-lg">{good()?.name}</span>
          <span class="text-xs text-[#999999]">id: {good()?.id}</span>
        </div>
      </div>
      <Typography variant="body1" color="text.secondary">
        <span>价格：</span>
        <span style={{color: 'rgb(255, 0, 0)'}}>{good()?.price}¥</span>
      </Typography>
    </Card>
  </>
}

export default GoodCard
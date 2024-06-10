import { Component } from 'solid-js';
import { createAsync, useNavigate } from "@solidjs/router";
import { getGoods, getOrder } from "../lib/store";
import { Box, Card, CardMedia, Typography, useTheme, Avatar } from '@suid/material';

export const OrderCard: Component<{ id: number }> = (props) => {
  const { id } = props;
	const navigate = useNavigate();
  const order = createAsync(() => getOrder(id));
  const goods = createAsync(() => getGoods());
  const theme = useTheme();

  const calculateTotalAmount = () => {
    return order()?.items.reduce((total, item) => {
      const good = goods()?.find(g => g.id === item.good_id);
      return total + (good?.price || 0) * item.quantity;
    }, 0);
  };

	const handleCardClick = () => {
    navigate(`/orders/${id}`)
  }

  return (
    <Card
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#eeeeee",
        }
      }}
			onClick={handleCardClick}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        订单: {id}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', marginBottom: 2 }}>
        {order()?.items.map(item => {
          const good = goods()?.find(g => g.id === item.good_id);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
              <Avatar src={good?.imgs[0]} alt={good?.name} sx={{ width: 56, height: 56, marginRight: 1 }} />
              <Typography variant="body2">x{item.quantity}</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography variant="h6" sx={{ textAlign: 'right' }}>
        总价: ¥{calculateTotalAmount()}
      </Typography>
    </Card>
  );
};

export default OrderCard;

import { createSignal, onMount } from "solid-js"
import { Box, Button, Card, Grid, Typography, useTheme } from "@suid/material"
import { createAsync, useNavigate } from "@solidjs/router"
import { getGoods, getGoodCategories } from "../../lib/store"
import GoodCard from "../../components/GoodCard"

const CategoryPage = () => {
  const goods = createAsync(() => getGoods())
  const categories = createAsync(() => getGoodCategories())
  const navigate = useNavigate()
  const theme = useTheme()

  const [selectedCategory, setSelectedCategory] = createSignal(0)

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  const filteredGoods = () => goods()?.filter(good => good.category_id === selectedCategory())

  return (
    <div class='flex h-full'>
      {/* 左侧分类列表 */}
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '20%', minWidth: 100,  backgroundColor: theme.palette.background.default }}>
        {categories()?.map(category => (
          <Button
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              padding: '16px',
            }}
            variant={selectedCategory() == category.id ? "contained" : "text"}
          >
            {category.name}
          </Button>
        ))}
      </Card>

      {/* 右侧商品展示 */}
      <Box sx={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: '16px' }}>
          分类
        </Typography>
        <div class="flex flex-wrap gap-4">
          {filteredGoods()?.map(good => (
            <GoodCard id={good.id} />
            // <Grid item xs={6} sx={{ textAlign: 'center' }} onClick={() => { navigate(`/goods/${good.id}`) }}>
            //   <img src={good.imgs[0]} alt={good.name} style={{ width: '100px', height: '100px' }} />
            //   <Typography variant="body1" component="div">
            //     {good.name}
            //   </Typography>
            // </Grid>
          ))}
        </div>
      </Box>
    </div>
  )
}

export default CategoryPage
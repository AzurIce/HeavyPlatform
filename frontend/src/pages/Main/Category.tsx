import { createSignal, onMount } from "solid-js"
import { Box, Grid, Typography } from "@suid/material"
import { createAsync, useNavigate } from "@solidjs/router"
import { getGoods, getCategories } from "../../lib/store"

const CategoryPage = () => {
  const goods = createAsync(() => getGoods())
  const categories = createAsync(() => getCategories())
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = createSignal(0)

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  const filteredGoods = () => goods()?.filter(good => good.category_id === selectedCategory())

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* 左侧分类列表 */}
      <Box sx={{ width: '20%', borderRight: '1px solid #ccc' }}>
        {categories()?.map(category => (
          <Box
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              padding: '16px',
              cursor: 'pointer',
              backgroundColor: selectedCategory() === category.id ? '#f0f0f0' : 'transparent',
              color: selectedCategory() === category.id ? 'red' : 'black',
            }}
          >
            {category.name}
          </Box>
        ))}
      </Box>

      {/* 右侧商品展示 */}
      <Box sx={{ flex: 1, padding: '16px' }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: '16px' }}>
          分类
        </Typography>
        <Grid container spacing={2}>
          {filteredGoods()?.map(good => (
            <Grid item xs={6} sx={{ textAlign: 'center' }} onClick={() => {navigate(`/goods/${good.id}`)}}>
              <img src={good.imgs[0]} alt={good.name} style={{ width: '100px', height: '100px' }} />
              <Typography variant="body1" component="div">
                {good.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default CategoryPage
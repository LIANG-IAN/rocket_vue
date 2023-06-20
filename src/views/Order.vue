<script>

</script>

<template>
    <div>
        <div v-for="(order, index) in orderList" :key="index" class="order-item">
            <div class="order-info">
                <span class="order-id">訂單編號：{{ order.orderId }}</span>
                <span class="order-total-price">總金額：{{ order.totalPrice }}</span>
            </div>
            <button @click="showOrderDetails(order)">查看詳細</button>
        </div>
        <div v-if="selectedOrder" class="order-details">
            <h2>訂單詳情</h2>
            <div class="product-list">
                <div v-for="(product, quantity) in selectedOrder.products" :key="product.productId" class="product-item">
                    <span class="product-name">{{ product.productName }}</span>
                    <span class="product-quantity">數量：{{ quantity }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
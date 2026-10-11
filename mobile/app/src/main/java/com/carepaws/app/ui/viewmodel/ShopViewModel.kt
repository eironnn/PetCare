package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.CartItem
import com.carepaws.app.data.model.OrderItem
import com.carepaws.app.data.model.Product
import com.carepaws.app.data.repository.CarePawsRepository
import kotlinx.coroutines.launch

class ShopViewModel(private val repository: CarePawsRepository) : ViewModel() {

    var products by mutableStateOf<List<Product>>(emptyList())
        private set
    var cart by mutableStateOf<List<CartItem>>(emptyList())
        private set
    var query by mutableStateOf("")
    var isLoading by mutableStateOf(true)
        private set
    var isCheckingOut by mutableStateOf(false)
        private set
    var error by mutableStateOf<String?>(null)
        private set
    var orderPlaced by mutableStateOf(false)
        private set

    init { refresh() }

    fun refresh() {
        isLoading = true
        viewModelScope.launch {
            when (val r = repository.getProducts()) {
                is ApiResult.Success -> products = r.data
                is ApiResult.Error -> error = r.message
                ApiResult.Loading -> Unit
            }
            isLoading = false
        }
    }

    val filtered: List<Product>
        get() = if (query.isBlank()) products
        else products.filter { it.name.contains(query, ignoreCase = true) }

    val cartTotal: Double get() = cart.sumOf { it.product.price * it.quantity }
    val cartCount: Int get() = cart.sumOf { it.quantity }

    fun addToCart(product: Product) {
        cart = cart.toMutableList().also { list ->
            val idx = list.indexOfFirst { it.product.id == product.id }
            if (idx >= 0) list[idx] = list[idx].copy(quantity = list[idx].quantity + 1)
            else list.add(CartItem(product, 1))
        }
    }

    fun changeQuantity(productId: String, delta: Int) {
        cart = cart.mapNotNull { item ->
            if (item.product.id != productId) item
            else {
                val q = item.quantity + delta
                if (q <= 0) null else item.copy(quantity = q)
            }
        }
    }

    fun checkout() {
        if (cart.isEmpty()) return
        isCheckingOut = true
        error = null
        viewModelScope.launch {
            val items = cart.map { OrderItem(it.product.id, it.quantity, it.product.price) }
            when (val r = repository.checkout(items)) {
                is ApiResult.Success -> {
                    cart = emptyList()
                    orderPlaced = true
                }
                is ApiResult.Error -> error = r.message
                ApiResult.Loading -> Unit
            }
            isCheckingOut = false
        }
    }

    fun dismissOrderPlaced() { orderPlaced = false }
}

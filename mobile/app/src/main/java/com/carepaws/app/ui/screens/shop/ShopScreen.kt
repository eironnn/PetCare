package com.carepaws.app.ui.screens.shop

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.model.CartItem
import com.carepaws.app.data.model.Product
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.components.CarePawsButton
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.CarePawsTextField
import com.carepaws.app.ui.components.FullScreenLoading
import com.carepaws.app.ui.components.TabScaffold
import com.carepaws.app.ui.navigation.Routes
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.viewmodel.ShopViewModel
import java.text.NumberFormat
import java.util.Locale

private fun peso(amount: Double): String =
    "₱" + NumberFormat.getNumberInstance(Locale.US).format(amount.toInt())

@Composable
fun ShopScreen(
    repository: CarePawsRepository,
    onNavigate: (String) -> Unit
) {
    val vm: ShopViewModel = viewModel { ShopViewModel(repository) }
    var showCart by remember { mutableStateOf(false) }

    TabScaffold(
        title = "Shop",
        currentRoute = Routes.SHOP,
        onNavigate = onNavigate,
        actions = {
            IconButton(onClick = { showCart = true }) {
                Icon(Icons.Filled.ShoppingCart, contentDescription = "Cart")
            }
        }
    ) {
        Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
            CarePawsTextField(
                value = vm.query,
                onValueChange = { vm.query = it },
                label = "Search products…"
            )
            Spacer(Modifier.height(12.dp))
            if (vm.isLoading) {
                FullScreenLoading()
            } else {
                LazyVerticalGrid(
                    columns = GridCells.Fixed(2),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(vm.filtered) { product ->
                        ProductCard(product = product, onAdd = { vm.addToCart(product) })
                    }
                }
            }
        }
    }

    if (showCart) {
        CartSheet(
            vm = vm,
            onClose = { showCart = false }
        )
    }

    if (vm.orderPlaced) {
        AlertDialog(
            onDismissRequest = { vm.dismissOrderPlaced() },
            icon = {
                Icon(Icons.Filled.CheckCircle, contentDescription = null,
                    tint = BrandOrange, modifier = Modifier.size(48.dp))
            },
            title = { Text("Order placed!") },
            text = { Text("The clinic will prepare your items for pickup.") },
            confirmButton = {
                TextButton(onClick = { vm.dismissOrderPlaced() }) { Text("Done") }
            }
        )
    }
}

@Composable
private fun ProductCard(product: Product, onAdd: () -> Unit) {
    Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            // Product image placeholder (Coil AsyncImage when photoUrl exists)
            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(110.dp)
            ) {
                androidx.compose.foundation.layout.Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Icon(Icons.Filled.ShoppingBag, contentDescription = null,
                        tint = BrandOrange, modifier = Modifier.size(40.dp))
                }
            }
            Spacer(Modifier.height(8.dp))
            Text(product.name, style = MaterialTheme.typography.titleMedium, maxLines = 2)
            Text(peso(product.price), style = MaterialTheme.typography.titleMedium,
                color = BrandOrange)
            Spacer(Modifier.height(8.dp))
            CarePawsButton("Add to cart", onClick = onAdd)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun CartSheet(vm: ShopViewModel, onClose: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Your cart (${vm.cartCount})") },
                navigationIcon = {
                    IconButton(onClick = onClose) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Close")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            if (vm.cart.isEmpty()) {
                Text("Your cart is empty.", style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier.padding(top = 32.dp))
            } else {
                LazyColumn(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(vm.cart) { item -> CartRow(item, vm) }
                }
                CarePawsCard {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Subtotal", style = MaterialTheme.typography.titleMedium)
                        Text(peso(vm.cartTotal),
                            style = MaterialTheme.typography.titleMedium, color = BrandOrange)
                    }
                }
                vm.error?.let {
                    Text(it, color = MaterialTheme.colorScheme.error)
                }
                if (vm.isCheckingOut) {
                    CircularProgressIndicator(color = BrandOrange,
                        modifier = Modifier.align(Alignment.CenterHorizontally))
                } else {
                    CarePawsButton("Checkout") { vm.checkout() }
                }
            }
        }
    }
}

@Composable
private fun CartRow(item: CartItem, vm: ShopViewModel) {
    CarePawsCard {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(modifier = Modifier.weight(1f)) {
                Text(item.product.name, style = MaterialTheme.typography.titleMedium)
                Text(peso(item.product.price),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            IconButton(onClick = { vm.changeQuantity(item.product.id, -1) }) {
                Icon(Icons.Filled.Remove, contentDescription = "Decrease")
            }
            Text("${item.quantity}", style = MaterialTheme.typography.titleMedium)
            IconButton(onClick = { vm.changeQuantity(item.product.id, 1) }) {
                Icon(Icons.Filled.Add, contentDescription = "Increase")
            }
            IconButton(onClick = {
                vm.changeQuantity(item.product.id, -item.quantity)
            }) {
                Icon(Icons.Filled.Delete, contentDescription = "Remove",
                    tint = MaterialTheme.colorScheme.error)
            }
        }
    }
}

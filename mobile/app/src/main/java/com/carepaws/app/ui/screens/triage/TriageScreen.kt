package com.carepaws.app.ui.screens.triage

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.model.TriageSubmission
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.components.CarePawsButton
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.FullScreenLoading
import com.carepaws.app.ui.components.TabScaffold
import com.carepaws.app.ui.navigation.Routes
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.theme.Cream
import com.carepaws.app.ui.theme.Danger
import com.carepaws.app.ui.viewmodel.TriageViewModel

private data class ChatMsg(val fromAi: Boolean, val text: String)

private val quickPrompts = listOf(
    "My pet is not eating",
    "My pet is vomiting",
    "My pet has diarrhea",
    "My pet is acting unusual"
)

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun TriageScreen(
    repository: CarePawsRepository,
    onNavigate: (String) -> Unit
) {
    val vm: TriageViewModel = viewModel { TriageViewModel(repository) }
    var input by remember { mutableStateOf("") }
    var messages by remember { mutableStateOf<List<ChatMsg>>(emptyList()) }
    var showResult by remember { mutableStateOf<TriageSubmission?>(null) }
    val listState = rememberLazyListState()

    // Seed the chat once pets load.
    LaunchedEffect(vm.pets.firstOrNull()?.id) {
        if (messages.isEmpty() && vm.pets.isNotEmpty()) {
            val petName = vm.pets.firstOrNull()?.name ?: "your pet"
            messages = listOf(
                ChatMsg(true, "Hi! Tell me what $petName is experiencing, and I'll help you figure out how serious it could be.")
            )
            vm.selectedPetId = vm.pets.firstOrNull()?.id
        }
    }
    LaunchedEffect(messages.size) {
        if (messages.isNotEmpty()) listState.animateScrollToItem(messages.lastIndex)
    }
    // When a submission completes, show it as the AI answer + open the result card.
    LaunchedEffect(vm.justSubmitted) {
        vm.justSubmitted?.let { sub ->
            messages = messages + ChatMsg(true, sub.aiSuggestion)
            showResult = sub
            vm.dismissResult()
        }
    }

    TabScaffold(
        title = "AI Triage",
        currentRoute = Routes.TRIAGE,
        onNavigate = onNavigate
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Pet selector
            FlowRow(
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                vm.pets.forEach { pet ->
                    AssistChip(
                        onClick = { vm.selectedPetId = pet.id },
                        label = { Text(pet.name) },
                        colors = androidx.compose.material3.AssistChipDefaults.assistChipColors(
                            containerColor = if (vm.selectedPetId == pet.id)
                                MaterialTheme.colorScheme.primaryContainer
                            else MaterialTheme.colorScheme.surface
                        )
                    )
                }
            }

            if (vm.isLoading) {
                FullScreenLoading()
            } else {
                LazyColumn(
                    state = listState,
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(messages) { msg -> ChatBubble(msg) }
                    if (vm.isSubmitting) {
                        item {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                AiAvatar()
                                Spacer(Modifier.width(8.dp))
                                CircularProgressIndicator(
                                    color = BrandOrange,
                                    modifier = Modifier.size(24.dp)
                                )
                            }
                        }
                    }
                    showResult?.let { sub ->
                        item { TriageResultCard(sub, onBook = { onNavigate(Routes.BOOKING) }) }
                    }
                    // History
                    if (vm.history.isNotEmpty()) {
                        item {
                            Spacer(Modifier.height(8.dp))
                            Text("Previous submissions",
                                style = MaterialTheme.typography.titleMedium)
                        }
                        items(vm.history) { sub ->
                            CarePawsCard {
                                Text(
                                    sub.severity.replaceFirstChar { it.uppercase() },
                                    color = when (sub.severity) {
                                        "urgent", "high" -> Danger
                                        else -> BrandOrange
                                    },
                                    style = MaterialTheme.typography.labelLarge
                                )
                                Text(sub.symptoms,
                                    style = MaterialTheme.typography.bodyMedium)
                                Text(sub.submittedAt,
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                }

                // Quick prompts
                FlowRow(
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    quickPrompts.forEach { prompt ->
                        AssistChip(onClick = {
                            vm.symptoms = prompt
                            sendMessage(vm, prompt) { messages = messages + it }
                        }, label = { Text(prompt) })
                    }
                }

                // Input row
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    OutlinedTextField(
                        value = input,
                        onValueChange = { input = it },
                        placeholder = { Text("Type your message…") },
                        shape = RoundedCornerShape(24.dp),
                        modifier = Modifier.weight(1f),
                        singleLine = false,
                        maxLines = 3
                    )
                    Spacer(Modifier.width(8.dp))
                    Surface(
                        shape = CircleShape,
                        color = BrandOrange,
                        modifier = Modifier.size(48.dp),
                        onClick = {
                            if (input.isNotBlank() && !vm.isSubmitting) {
                                val text = input.trim()
                                input = ""
                                sendMessage(vm, text) { messages = messages + it }
                            }
                        }
                    ) {
                        androidx.compose.foundation.layout.Box(
                            contentAlignment = Alignment.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Icon(Icons.Filled.Send, contentDescription = "Send", tint = Cream)
                        }
                    }
                }
                vm.error?.let {
                    Text(
                        it, color = MaterialTheme.colorScheme.error,
                        modifier = Modifier.padding(horizontal = 16.dp)
                            .padding(bottom = 8.dp)
                    )
                }
            }
        }
    }
}

private fun sendMessage(
    vm: TriageViewModel,
    text: String,
    append: (List<ChatMsg>) -> Unit
) {
    append(listOf(ChatMsg(false, text)))
    vm.symptoms = text
    vm.submit()
}

@Composable
private fun AiAvatar() {
    Surface(shape = CircleShape, color = MaterialTheme.colorScheme.primaryContainer,
        modifier = Modifier.size(36.dp)) {
        androidx.compose.foundation.layout.Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Icon(Icons.Filled.Pets, contentDescription = null,
                tint = BrandOrange, modifier = Modifier.size(20.dp))
        }
    }
}

@Composable
private fun ChatBubble(msg: ChatMsg) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (msg.fromAi) Arrangement.Start else Arrangement.End
    ) {
        if (msg.fromAi) {
            AiAvatar()
            Spacer(Modifier.width(8.dp))
        }
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(
                containerColor = if (msg.fromAi) MaterialTheme.colorScheme.surfaceVariant
                else BrandOrange
            ),
            modifier = Modifier.fillMaxWidth(0.8f)
        ) {
            Text(
                msg.text,
                modifier = Modifier.padding(12.dp),
                style = MaterialTheme.typography.bodyMedium,
                color = if (msg.fromAi) MaterialTheme.colorScheme.onSurfaceVariant
                else Cream
            )
        }
    }
}

@Composable
private fun TriageResultCard(sub: TriageSubmission, onBook: () -> Unit) {
    CarePawsCard {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Warning, contentDescription = null, tint = Danger)
            Spacer(Modifier.width(8.dp))
            Column {
                Text(
                    "Possible concern",
                    style = MaterialTheme.typography.labelLarge,
                    color = Danger
                )
                Text(
                    sub.severity.replaceFirstChar { it.uppercase() } + " severity",
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }
        Spacer(Modifier.height(8.dp))
        Text(sub.aiSuggestion, style = MaterialTheme.typography.bodyMedium)
        Spacer(Modifier.height(8.dp))
        Text(
            "This is a preliminary suggestion, not a diagnosis. A veterinarian will review your submission.",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(12.dp))
        Text("Still concerned?", style = MaterialTheme.typography.titleMedium)
        Text(
            "Book an appointment with a vet for a proper check-up.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(8.dp))
        CarePawsButton("Book appointment", onClick = onBook)
    }
}

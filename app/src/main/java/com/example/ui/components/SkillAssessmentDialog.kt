package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.data.model.SkillAssessment
import com.example.ui.theme.*

@Composable
fun SkillAssessmentDialog(
    assessment: SkillAssessment,
    onDismiss: () -> Unit,
    onCompleted: (scorePercentage: Int, correctAnswers: Int, totalQuestions: Int) -> Unit
) {
    var currentQuestionIndex by remember { mutableStateOf(0) }
    var selectedOptionIndex by remember { mutableStateOf<Int?>(null) }
    var correctCount by remember { mutableStateOf(0) }
    var isAnswerSubmitted by remember { mutableStateOf(false) }
    var isTestFinished by remember { mutableStateOf(false) }

    val total = assessment.questions.size
    val currentQ = assessment.questions.getOrNull(currentQuestionIndex)

    Dialog(onDismissRequest = onDismiss) {
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Navy900),
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(0.85f)
                .border(2.dp, Gold400, RoundedCornerShape(20.dp))
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(20.dp)
                    .verticalScroll(rememberScrollState())
            ) {
                // Header
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.School,
                            contentDescription = "Assessment",
                            tint = Gold400,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "MMP SHIELD™ Assessment",
                            color = Color.White,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    IconButton(onClick = onDismiss, modifier = Modifier.size(28.dp)) {
                        Icon(imageVector = Icons.Default.Close, contentDescription = "Close", tint = Slate400)
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Title & Progress Bar
                Text(
                    text = assessment.title,
                    color = Gold300,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                )

                Spacer(modifier = Modifier.height(8.dp))

                if (!isTestFinished && currentQ != null) {
                    val progress = (currentQuestionIndex + 1).toFloat() / total.toFloat()
                    LinearProgressIndicator(
                        progress = { progress },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(6.dp)
                            .clip(RoundedCornerShape(3.dp)),
                        color = Gold400,
                        trackColor = Navy800
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Question ${currentQuestionIndex + 1} of $total",
                        color = Slate400,
                        fontSize = 12.sp
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // Question Text Box
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(Navy800)
                            .border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(12.dp))
                            .padding(14.dp)
                    ) {
                        Text(
                            text = currentQ.question,
                            color = Color.White,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium,
                            lineHeight = 20.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Options list
                    currentQ.options.forEachIndexed { idx, option ->
                        val isSelected = selectedOptionIndex == idx
                        val isCorrect = idx == currentQ.correctOptionIndex
                        val optionBg = when {
                            isAnswerSubmitted && isCorrect -> EmeraldSuccess.copy(alpha = 0.25f)
                            isAnswerSubmitted && isSelected && !isCorrect -> RubyRed.copy(alpha = 0.25f)
                            isSelected -> Navy700
                            else -> Navy800.copy(alpha = 0.7f)
                        }
                        val optionBorder = when {
                            isAnswerSubmitted && isCorrect -> EmeraldSuccess
                            isAnswerSubmitted && isSelected && !isCorrect -> RubyRed
                            isSelected -> Gold400
                            else -> Slate700
                        }

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp)
                                .clip(RoundedCornerShape(10.dp))
                                .background(optionBg)
                                .border(1.5.dp, optionBorder, RoundedCornerShape(10.dp))
                                .clickable(enabled = !isAnswerSubmitted) {
                                    selectedOptionIndex = idx
                                }
                                .padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "${('A'.code + idx).toChar()}.",
                                color = if (isSelected) Gold400 else Slate400,
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp
                            )
                            Spacer(modifier = Modifier.width(10.dp))
                            Text(
                                text = option,
                                color = if (isSelected) Color.White else Slate200,
                                fontSize = 13.sp,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }

                    // Explanation Box if submitted
                    if (isAnswerSubmitted) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(Navy950)
                                .border(1.dp, Gold500.copy(alpha = 0.4f), RoundedCornerShape(8.dp))
                                .padding(12.dp)
                        ) {
                            Column {
                                Text(
                                    text = "💡 Explanation:",
                                    color = Gold400,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Spacer(modifier = Modifier.height(2.dp))
                                Text(
                                    text = currentQ.explanation,
                                    color = Slate300,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    // Action buttons (Check Answer / Next Question)
                    if (!isAnswerSubmitted) {
                        Button(
                            onClick = {
                                if (selectedOptionIndex != null) {
                                    isAnswerSubmitted = true
                                    if (selectedOptionIndex == currentQ.correctOptionIndex) {
                                        correctCount += 1
                                    }
                                }
                            },
                            enabled = selectedOptionIndex != null,
                            modifier = Modifier.fillMaxWidth().height(46.dp),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Gold400,
                                contentColor = Navy950
                            )
                        ) {
                            Text("SUBMIT ANSWER", fontWeight = FontWeight.Bold)
                        }
                    } else {
                        Button(
                            onClick = {
                                if (currentQuestionIndex < total - 1) {
                                    currentQuestionIndex += 1
                                    selectedOptionIndex = null
                                    isAnswerSubmitted = false
                                } else {
                                    isTestFinished = true
                                }
                            },
                            modifier = Modifier.fillMaxWidth().height(46.dp),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Gold400,
                                contentColor = Navy950
                            )
                        ) {
                            Text(
                                text = if (currentQuestionIndex < total - 1) "NEXT QUESTION →" else "VIEW CERTIFICATION RESULT",
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                } else {
                    // Test Finished Screen
                    val scorePercent = ((correctCount.toFloat() / total.toFloat()) * 100).toInt()
                    val passed = scorePercent >= assessment.passingScore
                    val badgeLevel = if (scorePercent >= 90) "Gold Certified" else if (scorePercent >= 75) "Silver Certified" else "Bronze Certified"

                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Icon(
                            imageVector = if (passed) Icons.Default.Verified else Icons.Default.Info,
                            contentDescription = "Result",
                            tint = if (passed) Gold400 else RubyRed,
                            modifier = Modifier.size(60.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = if (passed) "ASSESSMENT PASSED!" else "KEEP PRACTICING",
                            color = if (passed) Gold300 else Slate300,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Black
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Score: $scorePercent% ($correctCount of $total correct)",
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        // Badge preview box
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(14.dp))
                                .background(Navy800)
                                .border(2.dp, Gold400, RoundedCornerShape(14.dp))
                                .padding(16.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text(
                                    text = "🎖️ $badgeLevel",
                                    color = Gold400,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = assessment.badgeAvailable,
                                    color = Color.White,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Medium
                                )
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = "MMP SHIELD™ Cryptographic Verification",
                                    color = EmeraldSuccess,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        Button(
                            onClick = {
                                onCompleted(scorePercent, correctCount, total)
                                onDismiss()
                            },
                            modifier = Modifier.fillMaxWidth().height(48.dp),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Gold400,
                                contentColor = Navy950
                            )
                        ) {
                            Text(
                                text = "ATTACH BADGE TO MY PROFILE",
                                fontWeight = FontWeight.Black,
                                fontSize = 13.sp
                            )
                        }
                    }
                }
            }
        }
    }
}

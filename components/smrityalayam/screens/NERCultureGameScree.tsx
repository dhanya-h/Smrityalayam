'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useT, useLang } from '../useT'
import { useApp } from '../AppContext'

interface StepItem {
  id: number
  text: string
  detail: string
  icon: string
}

interface RecipeTask {
  id: string
  title: string
  region: string
  steps: StepItem[]
}

const NER_RECIPES: RecipeTask[] = [
  {
    id: 'masor-tenga',
    title: 'Assamese Masor Tenga (Sour Fish Curry)',
    region: 'Assam',
    steps: [
      { id: 1, text: 'Fry fresh river fish lightly with turmeric & salt', detail: 'Step 1', icon: '🐟' },
      { id: 2, text: 'Prepare sour broth using Ou Tenga (Elephant Apple) or tomatoes', detail: 'Step 2', icon: '🍲' },
      { id: 3, text: 'Simmer fish in broth with fenugreek seeds and mustard oil', detail: 'Step 3', icon: '🔥' },
      { id: 4, text: 'Garnish with fresh coriander and serve hot with steamed rice', detail: 'Step 4', icon: '🍚' },
    ],
  },
  {
    id: 'eromba',
    title: 'Manipuri Eromba & Chak-Hao Feast',
    region: 'Manipur',
    steps: [
      { id: 1, text: 'Boil fresh vegetables with Ngari (fermented fish)', detail: 'Step 1', icon: '🥬' },
      { id: 2, text: 'Mash boiled vegetables together with King Chilli (U-Morok)', detail: 'Step 2', icon: '🌶️' },
      { id: 3, text: 'Garnish with fresh herbs (Maroi Nakupi)', detail: 'Step 3', icon: '🌿' },
      { id: 4, text: 'Serve alongside fragrant black rice (Chak-hao)', detail: 'Step 4', icon: '🍚' },
    ],
  },
]

export default function NERCultureGameScreen() {
  const { navigate } = useApp()
  const t = useT()
  const lang = useLang()

  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0)
  const activeRecipe = NER_RECIPES[currentRecipeIndex]

  // Shuffle initial sequence
  const [userSequence, setUserSequence] = useState<StepItem[]>([
    activeRecipe.steps[2],
    activeRecipe.steps[0],
    activeRecipe.steps[3],
    activeRecipe.steps[1],
  ])

  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...userSequence]
    const temp = updated[index]
    updated[index] = updated[index - 1]
    updated[index - 1] = temp
    setUserSequence(updated)
  }

  const handleVerify = () => {
    const isCorrect = userSequence.every((step, idx) => step.id === idx + 1)
    if (isCorrect) {
      setIsSuccess(true)
      setMessage(lang === 'hi' ? 'अद्भुत! आपने पारंपरिक नुस्खे का सही क्रम सजाया।' : 'Wonderful! You arranged the traditional recipe correctly.')
    } else {
      setMessage(lang === 'hi' ? 'कुछ चरण गलत हैं, फिर से प्रयास करें।' : 'Some steps are out of order. Try swapping them!')
    }
  }

  const handleNextRecipe = () => {
    const nextIdx = (currentRecipeIndex + 1) % NER_RECIPES.length
    setCurrentRecipeIndex(nextIdx)
    const nextRecipe = NER_RECIPES[nextIdx]
    setUserSequence([
      nextRecipe.steps[1],
      nextRecipe.steps[3],
      nextRecipe.steps[0],
      nextRecipe.steps[2],
    ])
    setIsSuccess(false)
    setMessage('')
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation & Audio Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('activities')}
            className="px-4 py-2 bg-warm-peach text-maroon border border-warm-tan font-bold rounded-full text-xs hover:bg-maroon hover:text-white transition-colors cursor-pointer"
          >
            ← {lang === 'hi' ? 'वापस' : 'Back'}
          </button>
          <ReadAloudButton textToRead={`Northeast Cultural Recipe Test. ${activeRecipe.title}. Arrange the preparation steps in correct order.`} />
        </div>

        {/* Game Body */}
        <div className="bg-cream border-2 border-warm-tan rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-warm-tan pb-4">
            <span className="px-3 py-1 bg-saffron text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              {activeRecipe.region} Cultural Heritage
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-maroon mt-2">
              🍲 {activeRecipe.title}
            </h1>
            <p className="text-warm-gray text-xs mt-1">
              {lang === 'hi'
                ? 'इस पारंपरिक पूर्वांचल व्यंजन के चरणों को सही क्रम में लगाएं:'
                : 'Arrange the steps for preparing this traditional Northeast delicacy in correct sequence:'}
            </p>
          </div>

          {/* Interactive Steps List */}
          <div className="space-y-3">
            {userSequence.map((step, idx) => (
              <div
                key={step.id}
                className="p-4 bg-parchment border-2 border-warm-tan rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{step.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold text-maroon uppercase block">
                      Position {idx + 1}
                    </span>
                    <p className="font-bold text-sm text-warm-black">
                      {step.text}
                    </p>
                  </div>
                </div>

                {idx > 0 && !isSuccess && (
                  <button
                    onClick={() => handleMoveUp(idx)}
                    className="px-3 py-1.5 bg-saffron text-white text-xs font-bold rounded-lg hover:bg-saffron-dk cursor-pointer shadow-sm transition-transform active:scale-95"
                  >
                    ▲ Move Up
                  </button>
                )}
              </div>
            ))}
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-center font-bold text-sm ${isSuccess ? 'bg-green-100 text-green-900 border border-green-300' : 'bg-red-100 text-maroon border border-red-200'}`}>
              {message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            {!isSuccess ? (
              <button
                onClick={handleVerify}
                className="w-full py-4 bg-maroon text-white font-bold rounded-full hover:bg-maroon-deep transition-colors text-sm shadow-md cursor-pointer"
              >
                ✓ {lang === 'hi' ? 'क्रम की पुष्टि करें' : 'Verify Cooking Sequence'}
              </button>
            ) : (
              <button
                onClick={handleNextRecipe}
                className="w-full py-4 bg-saffron text-white font-bold rounded-full hover:bg-saffron-dk transition-colors text-sm shadow-md cursor-pointer"
              >
                ➔ {lang === 'hi' ? 'अगला व्यंजन लें' : 'Try Next Regional Specialty'}
              </button>
            )}
          </div>
        </div>
      </div>
    </ElderLayout>
  )
}
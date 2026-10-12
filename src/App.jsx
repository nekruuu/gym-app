import React, { useState, useEffect } from 'react'

// Nombres descriptivos de cada día
const dayTitles = {
  Martes: 'Pecho, Hombros y Tríceps',
  Miércoles: 'Pierna Completa',
  Jueves: 'Espalda, Bíceps y Antebrazo',
  Viernes: 'Pierna y Enfoque Femoral',
  Sábado: 'Torso Completo'
}

// Rutina Inicial de Respaldo con variantes y series independientes
const initialWorkoutData = {
  Martes: [
    {
      id: 'mar-1',
      name: 'Press Inclinado en Smith',
      muscle: 'Pecho',
      variants: ['Press Inclinado en Smith', 'Press Inclinado con Mancuernas'],
      activeVariant: 'Press Inclinado en Smith',
      variantsData: {
        'Press Inclinado en Smith': [
          { weight: '10kg/lado', reps: 'Calentamiento', rir: '', completed: false },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0', completed: false },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0', completed: false }
        ],
        'Press Inclinado con Mancuernas': [
          { weight: '', reps: '', rir: '', completed: false },
          { weight: '', reps: '', rir: '', completed: false },
          { weight: '', reps: '', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mar-2',
      name: 'Peck Deck',
      muscle: 'Pecho',
      variants: ['Peck Deck', 'Cruce de Poleas Alta', 'Aperturas con Mancuernas'],
      activeVariant: 'Peck Deck',
      variantsData: {
        'Peck Deck': [
          { weight: '60kg', reps: '9', rir: 'Fallo', completed: false },
          { weight: '55kg', reps: '6', rir: 'Fallo', completed: false }
        ],
        'Cruce de Poleas Alta': [
          { weight: '', reps: '', rir: '', completed: false },
          { weight: '', reps: '', rir: '', completed: false }
        ],
        'Aperturas con Mancuernas': [
          { weight: '', reps: '', rir: '', completed: false },
          { weight: '', reps: '', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mar-3',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas', 'Elevaciones Laterales en Máquina'],
      activeVariant: 'Laterales en polea',
      variantsData: {
        'Laterales en polea': [
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'mar-4',
      name: 'Extension en polea baja con soga',
      muscle: 'Tríceps',
      variants: ['Extension en polea baja con soga', 'Extension en polea media con una mano'],
      activeVariant: 'Extension en polea baja con soga',
      variantsData: {
        'Extension en polea baja con soga': [
          { weight: '30kg', reps: '9', rir: 'Fallo', completed: false },
          { weight: '30kg', reps: '7', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'mar-5',
      name: 'Extension en polea alta con una mano',
      muscle: 'Tríceps',
      variants: ['Extension en polea alta con una mano', 'Extensiones OverHead en Polea'],
      activeVariant: 'Extension en polea alta con una mano',
      variantsData: {
        'Extension en polea alta con una mano': [
          { weight: '3 ladrillos', reps: '6', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '8', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '8', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'mar-6',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      activeVariant: 'Abdominales en polea alta',
      variantsData: {
        'Abdominales en polea alta': [
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false },
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'mar-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      activeVariant: 'Elevaciones de piernas en inclinacion',
      variantsData: {
        'Elevaciones de piernas en inclinacion': [
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false },
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false }
        ]
      }
    }
  ],
  Miércoles: [
    {
      id: 'mie-1',
      name: 'Máquina de gemelos',
      muscle: 'Gemelos',
      variants: ['Máquina de gemelos', 'Elevación de talones de pie'],
      activeVariant: 'Máquina de gemelos',
      variantsData: {
        'Máquina de gemelos': [
          { weight: '40kg', reps: '12', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mie-2',
      name: 'Máquina de aductores',
      muscle: 'Aductores',
      variants: ['Máquina de aductores', 'Aductores en polea'],
      activeVariant: 'Máquina de aductores',
      variantsData: {
        'Máquina de aductores': [
          { weight: '30kg', reps: '12', rir: '', completed: false },
          { weight: '40kg', reps: '10', rir: '', completed: false },
          { weight: '40kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mie-3',
      name: 'Sillón de cuádriceps',
      muscle: 'Cuádriceps',
      variants: ['Sillón de cuádriceps', 'Sentadilla hack', 'Prensa inclinada'],
      activeVariant: 'Sillón de cuádriceps',
      variantsData: {
        'Sillón de cuádriceps': [
          { weight: '50kg', reps: '12', rir: '', completed: false },
          { weight: '80kg', reps: '10', rir: '', completed: false },
          { weight: '80kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mie-4',
      name: 'Péndulo',
      muscle: 'Cuádriceps',
      variants: ['Péndulo', 'Sentadilla hack', 'Prensa inclinada'],
      activeVariant: 'Péndulo',
      variantsData: {
        'Péndulo': [
          { weight: '20kg', reps: '10', rir: '', completed: false },
          { weight: '20kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mie-5',
      name: 'Máquina de femoral sentado',
      muscle: 'Femoral',
      variants: ['Máquina de femoral sentado', 'Curl femoral de pie', 'Curl femoral acostado'],
      activeVariant: 'Máquina de femoral sentado',
      variantsData: {
        'Máquina de femoral sentado': [
          { weight: '50kg', reps: '12', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'mie-6',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      activeVariant: 'Abdominales en polea alta',
      variantsData: {
        'Abdominales en polea alta': [
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false },
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'mie-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      activeVariant: 'Elevaciones de piernas en inclinacion',
      variantsData: {
        'Elevaciones de piernas en inclinacion': [
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false },
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false }
        ]
      }
    }
  ],
  Jueves: [
    {
      id: 'jue-1',
      name: 'Pullover en máquina',
      muscle: 'Espalda',
      variants: ['Pullover en máquina', 'Pullover en polea'],
      activeVariant: 'Pullover en máquina',
      variantsData: {
        'Pullover en máquina': [
          { weight: '25kg/lado', reps: '12', rir: '', completed: false },
          { weight: '45kg/lado', reps: '10', rir: '', completed: false },
          { weight: '45kg/lado', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-2',
      name: 'Jalon al pecho con agarre cerrado',
      muscle: 'Espalda',
      variants: ['Jalon al pecho con agarre cerrado', 'Jalon al pecho con agarre neutro'],
      activeVariant: 'Jalon al pecho con agarre cerrado',
      variantsData: {
        'Jalon al pecho con agarre cerrado': [
          { weight: '65kg', reps: '10', rir: '', completed: false },
          { weight: '65kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-3',
      name: 'Barra T',
      muscle: 'Espalda',
      variants: ['Barra T', 'Remo con mancuerna'],
      activeVariant: 'Barra T',
      variantsData: {
        'Barra T': [
          { weight: '35kg', reps: '10', rir: '', completed: false },
          { weight: '35kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-4',
      name: 'Curl predicador en máquina',
      muscle: 'Bíceps',
      variants: ['Curl predicador en máquina', 'Bicep alternado parado', 'Bicep alternado sentado'],
      activeVariant: 'Curl predicador en máquina',
      variantsData: {
        'Curl predicador en máquina': [
          { weight: '20kg', reps: '12', rir: '', completed: false },
          { weight: '30kg', reps: '10', rir: '', completed: false },
          { weight: '30kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-5',
      name: 'Bicep alternado parado',
      muscle: 'Bíceps',
      variants: ['Bicep alternado parado', 'Bicep alternado sentado'],
      activeVariant: 'Bicep alternado parado',
      variantsData: {
        'Bicep alternado parado': [
          { weight: '15kg/lado', reps: '10', rir: '', completed: false },
          { weight: '15kg/lado', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-6',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas', 'Elevaciones Laterales en Máquina'],
      activeVariant: 'Laterales en polea',
      variantsData: {
        'Laterales en polea': [
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'jue-7',
      name: 'Antebrazo polea baja',
      muscle: 'Antebrazo',
      variants: ['Antebrazo polea baja', 'Curl de antebrazo con barra'],
      activeVariant: 'Antebrazo polea baja',
      variantsData: {
        'Antebrazo polea baja': [
          { weight: '25kg', reps: '12', rir: '', completed: false },
          { weight: '25kg', reps: '12', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-8',
      name: 'Antebrazo polea alta',
      muscle: 'Antebrazo',
      variants: ['Antebrazo polea alta', 'Curl invertido en polea'],
      activeVariant: 'Antebrazo polea alta',
      variantsData: {
        'Antebrazo polea alta': [
          { weight: '50kg', reps: '12', rir: '', completed: false },
          { weight: '50kg', reps: '12', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'jue-9',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      activeVariant: 'Abdominales en polea alta',
      variantsData: {
        'Abdominales en polea alta': [
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false },
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'jue-10',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      activeVariant: 'Elevaciones de piernas en inclinacion',
      variantsData: {
        'Elevaciones de piernas en inclinacion': [
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false },
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false }
        ]
      }
    }
  ],
  Viernes: [
    {
      id: 'vie-1',
      name: 'Máquina de gemelos',
      muscle: 'Gemelos',
      variants: ['Máquina de gemelos', 'Elevación de talones de pie'],
      activeVariant: 'Máquina de gemelos',
      variantsData: {
        'Máquina de gemelos': [
          { weight: '40kg', reps: '12', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'vie-2',
      name: 'Máquina de aductores',
      muscle: 'Aductores',
      variants: ['Máquina de aductores', 'Aductores en polea'],
      activeVariant: 'Máquina de aductores',
      variantsData: {
        'Máquina de aductores': [
          { weight: '30kg', reps: '12', rir: '', completed: false },
          { weight: '40kg', reps: '10', rir: '', completed: false },
          { weight: '40kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'vie-3',
      name: 'Femoral parado',
      muscle: 'Femoral',
      variants: ['Femoral parado', 'Curl femoral acostado'],
      activeVariant: 'Femoral parado',
      variantsData: {
        'Femoral parado': [
          { weight: '10kg/lado', reps: '12', rir: '', completed: false },
          { weight: '20kg/lado', reps: '10', rir: '', completed: false },
          { weight: '20kg/lado', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'vie-4',
      name: 'Máquina de femoral sentado',
      muscle: 'Femoral',
      variants: ['Máquina de femoral sentado', 'Curl femoral acostado'],
      activeVariant: 'Máquina de femoral sentado',
      variantsData: {
        'Máquina de femoral sentado': [
          { weight: '70kg', reps: '10', rir: '', completed: false },
          { weight: '70kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'vie-5',
      name: 'Sillón de cuádriceps',
      muscle: 'Cuádriceps',
      variants: ['Sillón de cuádriceps', 'Sentadilla hack', 'Prensa inclinada'],
      activeVariant: 'Sillón de cuádriceps',
      variantsData: {
        'Sillón de cuádriceps': [
          { weight: '50kg', reps: '12', rir: '', completed: false },
          { weight: '80kg', reps: '10', rir: '', completed: false },
          { weight: '80kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'vie-6',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      activeVariant: 'Abdominales en polea alta',
      variantsData: {
        'Abdominales en polea alta': [
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false },
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'vie-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      activeVariant: 'Elevaciones de piernas en inclinacion',
      variantsData: {
        'Elevaciones de piernas en inclinacion': [
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false },
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false }
        ]
      }
    }
  ],
  Sábado: [
    {
      id: 'sab-1',
      name: 'Press Inclinado en Smith',
      muscle: 'Pecho',
      variants: ['Press Inclinado en Smith', 'Press Inclinado con Mancuernas'],
      activeVariant: 'Press Inclinado en Smith',
      variantsData: {
        'Press Inclinado en Smith': [
          { weight: '10kg/lado', reps: 'Calentamiento', rir: '', completed: false },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0', completed: false },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0', completed: false }
        ]
      }
    },
    {
      id: 'sab-2',
      name: 'Jalon al pecho con agarre cerrado',
      muscle: 'Espalda',
      variants: ['Jalon al pecho con agarre cerrado', 'Jalon al pecho con agarre neutro', 'Pullover en polea'],
      activeVariant: 'Jalon al pecho con agarre cerrado',
      variantsData: {
        'Jalon al pecho con agarre cerrado': [
          { weight: '40kg', reps: '12', rir: '', completed: false },
          { weight: '65kg', reps: '10', rir: '', completed: false },
          { weight: '65kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'sab-3',
      name: 'Peck Deck',
      muscle: 'Pecho',
      variants: ['Peck Deck', 'Cruce de Poleas Alta', 'Aperturas con Mancuernas'],
      activeVariant: 'Peck Deck',
      variantsData: {
        'Peck Deck': [
          { weight: '60kg', reps: '9', rir: 'Fallo', completed: false },
          { weight: '55kg', reps: '6', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'sab-4',
      name: 'Barra T',
      muscle: 'Espalda',
      variants: ['Barra T', 'Remo con mancuerna'],
      activeVariant: 'Barra T',
      variantsData: {
        'Barra T': [
          { weight: '35kg', reps: '10', rir: '', completed: false },
          { weight: '35kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'sab-5',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas', 'Elevaciones Laterales en Máquina'],
      activeVariant: 'Laterales en polea',
      variantsData: {
        'Laterales en polea': [
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'sab-6',
      name: 'Extension en polea baja con soga',
      muscle: 'Tríceps',
      variants: ['Extension en polea baja con soga', 'Extension en polea media con una mano'],
      activeVariant: 'Extension en polea baja con soga',
      variantsData: {
        'Extension en polea baja con soga': [
          { weight: '20kg', reps: '12', rir: '', completed: false },
          { weight: '30kg', reps: '9', rir: 'Fallo', completed: false },
          { weight: '30kg', reps: '7', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'sab-7',
      name: 'Curl predicador en máquina',
      muscle: 'Bíceps',
      variants: ['Curl predicador en máquina', 'Bicep alternado parado'],
      activeVariant: 'Curl predicador en máquina',
      variantsData: {
        'Curl predicador en máquina': [
          { weight: '20kg', reps: '12', rir: '', completed: false },
          { weight: '30kg', reps: '10', rir: '', completed: false },
          { weight: '30kg', reps: '10', rir: '', completed: false }
        ]
      }
    },
    {
      id: 'sab-8',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      activeVariant: 'Abdominales en polea alta',
      variantsData: {
        'Abdominales en polea alta': [
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false },
          { weight: '50kg', reps: '15', rir: 'Fallo', completed: false }
        ]
      }
    },
    {
      id: 'sab-9',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      activeVariant: 'Elevaciones de piernas en inclinacion',
      variantsData: {
        'Elevaciones de piernas en inclinacion': [
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false },
          { weight: 'Corporal', reps: '12', rir: 'Fallo', completed: false }
        ]
      }
    }
  ]
}

// Función de migración para preservar datos cargados en versiones anteriores
const migrateWorkoutData = (savedData) => {
  if (!savedData) return initialWorkoutData
  const migrated = {}

  Object.keys(initialWorkoutData).forEach((day) => {
    const initialDayExs = initialWorkoutData[day] || []
    const savedDayExs = savedData[day] || []

    migrated[day] = initialDayExs.map((initEx) => {
      const savedEx = savedDayExs.find((s) => s.id === initEx.id || s.name === initEx.name) || {}
      const activeVariant = savedEx.activeVariant || savedEx.name || initEx.name
      const variantsList = initEx.variants || [initEx.name]
      const variantsData = {}

      const savedVariantsData = savedEx.variantsData || {}
      const legacySets = savedEx.sets

      variantsList.forEach((variantName) => {
        if (savedVariantsData[variantName]) {
          variantsData[variantName] = savedVariantsData[variantName].map((s) => ({
            weight: s.weight ?? '',
            reps: s.reps ?? '',
            rir: s.rir ?? '',
            completed: !!s.completed
          }))
        } else if (legacySets && (variantName === activeVariant || variantName === savedEx.name)) {
          variantsData[variantName] = legacySets.map((s) => ({
            weight: s.weight ?? '',
            reps: s.reps ?? '',
            rir: s.rir ?? '',
            completed: !!s.completed
          }))
        } else {
          const defaultSets = (initEx.variantsData && initEx.variantsData[variantName])
            ? initEx.variantsData[variantName]
            : (initEx.sets || [
                { weight: '', reps: '', rir: '', completed: false },
                { weight: '', reps: '', rir: '', completed: false },
                { weight: '', reps: '', rir: '', completed: false }
              ])

          variantsData[variantName] = defaultSets.map((s) => ({
            weight: s.weight ?? '',
            reps: s.reps ?? '',
            rir: s.rir ?? '',
            completed: !!s.completed
          }))
        }
      })

      return {
        ...initEx,
        activeVariant: activeVariant,
        variantsData: variantsData
      }
    })
  })

  return migrated
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState('Martes')

  // Cargar y migrar datos en localStorage (preserva datos del usuario)
  const [workoutData, setWorkoutData] = useState(() => {
    const keys = ['gym_workout_data_v8', 'gym_workout_data_v7', 'gym_workout_data_v3', 'gym_workout_data']
    for (const key of keys) {
      const saved = localStorage.getItem(key)
      if (saved) {
        try {
          return migrateWorkoutData(JSON.parse(saved))
        } catch (e) {
          console.error('Error migrando datos:', e)
        }
      }
    }
    return initialWorkoutData
  })

  // Control del temporizador de entrenamiento con pausa limpia
  const [isTraining, setIsTraining] = useState(() => {
    return localStorage.getItem('gym_is_training') === 'true'
  })

  const [accumulatedSeconds, setAccumulatedSeconds] = useState(() => {
    const saved = localStorage.getItem('gym_accumulated_seconds')
    return saved ? Number(saved) : 0
  })

  const [startTime, setStartTime] = useState(() => {
    const savedTime = localStorage.getItem('gym_start_time')
    return savedTime ? Number(savedTime) : null
  })

  const [workoutSeconds, setWorkoutSeconds] = useState(0)

  // Control del temporizador de descanso
  const [restTargets, setRestTargets] = useState(() => {
    const savedRests = localStorage.getItem('gym_rest_targets')
    return savedRests ? JSON.parse(savedRests) : {}
  })
  const [restDisplays, setRestDisplays] = useState({})

  // Modal para Variantes de Ejercicios
  const [activeModalEx, setActiveModalEx] = useState(null)

  // Guardar datos de rutina en localStorage
  useEffect(() => {
    localStorage.setItem('gym_workout_data_v8', JSON.stringify(workoutData))
  }, [workoutData])

  useEffect(() => {
    localStorage.setItem('gym_is_training', isTraining.toString())
  }, [isTraining])

  useEffect(() => {
    localStorage.setItem('gym_accumulated_seconds', accumulatedSeconds.toString())
  }, [accumulatedSeconds])

  useEffect(() => {
    if (startTime) {
      localStorage.setItem('gym_start_time', startTime.toString())
    } else {
      localStorage.removeItem('gym_start_time')
    }
  }, [startTime])

  useEffect(() => {
    localStorage.setItem('gym_rest_targets', JSON.stringify(restTargets))
  }, [restTargets])

  // Loop de actualización del cronómetro principal de entrenamiento
  useEffect(() => {
    const updateTime = () => {
      if (isTraining && startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        setWorkoutSeconds(accumulatedSeconds + (elapsed > 0 ? elapsed : 0))
      } else {
        setWorkoutSeconds(accumulatedSeconds)
      }
    }

    updateTime()

    let interval = null
    if (isTraining) {
      interval = setInterval(updateTime, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTraining, startTime, accumulatedSeconds])

  // Loop de actualización de descansos (90s)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const newDisplays = {}

      Object.keys(restTargets).forEach((id) => {
        const remaining = Math.ceil((restTargets[id] - now) / 1000)
        if (remaining > 0) {
          newDisplays[id] = remaining
        } else {
          newDisplays[id] = 'FIN'
        }
      })

      setRestDisplays(newDisplays)
    }, 1000)

    return () => clearInterval(interval)
  }, [restTargets])

  // Pausar o Iniciar entrenamiento sin perder el tiempo acumulado
  const toggleTraining = () => {
    if (isTraining) {
      // Pausar: Guarda el tiempo acumulado exacto en el estado sin resetear a 0
      const nowElapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
      const newTotal = accumulatedSeconds + (nowElapsed > 0 ? nowElapsed : 0)
      setAccumulatedSeconds(newTotal)
      setWorkoutSeconds(newTotal)
      setStartTime(null)
      setIsTraining(false)
    } else {
      // Iniciar / Reanudar
      setStartTime(Date.now())
      setIsTraining(true)
    }
  }

  // Reiniciar temporizador a 0 manualmente con el botón ↺
  const resetTimer = () => {
    setStartTime(null)
    setIsTraining(false)
    setAccumulatedSeconds(0)
    setWorkoutSeconds(0)
    localStorage.removeItem('gym_start_time')
    localStorage.setItem('gym_accumulated_seconds', '0')
    localStorage.setItem('gym_is_training', 'false')
  }

  const startRestTimer = (exerciseId) => {
    if (restTargets[exerciseId]) {
      setRestTargets((prev) => {
        const copy = { ...prev }
        delete copy[exerciseId]
        return copy
      })
    } else {
      setRestTargets((prev) => ({
        ...prev,
        [exerciseId]: Date.now() + 90000
      }))
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Actualizar un campo (weight, reps, rir) en la variante activa del ejercicio
  const updateSet = (exerciseId, setIndex, field, value) => {
    setWorkoutData((prevData) => {
      const currentDayData = prevData[selectedDay] || []
      const updatedDayData = currentDayData.map((exercise) => {
        if (exercise.id === exerciseId) {
          const activeVar = exercise.activeVariant || exercise.name
          const currentSets = exercise.variantsData[activeVar] || []
          const updatedSets = currentSets.map((set, idx) => {
            if (idx === setIndex) {
              return { ...set, [field]: value }
            }
            return set
          })
          return {
            ...exercise,
            variantsData: {
              ...exercise.variantsData,
              [activeVar]: updatedSets
            }
          }
        }
        return exercise
      })
      return { ...prevData, [selectedDay]: updatedDayData }
    })
  }

  // Marcar / desmarcar casilla de check de la serie
  const toggleSetComplete = (exerciseId, setIndex) => {
    setWorkoutData((prevData) => {
      const currentDayData = prevData[selectedDay] || []
      const updatedDayData = currentDayData.map((exercise) => {
        if (exercise.id === exerciseId) {
          const activeVar = exercise.activeVariant || exercise.name
          const currentSets = exercise.variantsData[activeVar] || []
          const updatedSets = currentSets.map((set, idx) => {
            if (idx === setIndex) {
              return { ...set, completed: !set.completed }
            }
            return set
          })
          return {
            ...exercise,
            variantsData: {
              ...exercise.variantsData,
              [activeVar]: updatedSets
            }
          }
        }
        return exercise
      })
      return { ...prevData, [selectedDay]: updatedDayData }
    })
  }

  // Cambiar variante manteniendo sus datos independientes
  const selectVariant = (exerciseId, newVariantName) => {
    setWorkoutData((prevData) => {
      const currentDayData = prevData[selectedDay] || []
      const updatedDayData = currentDayData.map((ex) => {
        if (ex.id === exerciseId) {
          const existingData = ex.variantsData[newVariantName] || [
            { weight: '', reps: '', rir: '', completed: false },
            { weight: '', reps: '', rir: '', completed: false },
            { weight: '', reps: '', rir: '', completed: false }
          ]
          return {
            ...ex,
            activeVariant: newVariantName,
            variantsData: {
              ...ex.variantsData,
              [newVariantName]: existingData
            }
          }
        }
        return ex
      })
      return { ...prevData, [selectedDay]: updatedDayData }
    })
    setActiveModalEx(null)
  }

  // Cálculo del contador de progreso general de series N/M del día
  const currentDayExercises = workoutData[selectedDay] || []
  let totalSets = 0
  let completedSets = 0

  currentDayExercises.forEach((ex) => {
    const activeVar = ex.activeVariant || ex.name
    const sets = ex.variantsData?.[activeVar] || []
    totalSets += sets.length
    completedSets += sets.filter((s) => s.completed).length
  })

  const progressPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-12 safe-bottom">
      {/* Header Fijo */}
      <header className="px-4 pt-3 pb-2 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/60 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 animate-pulse text-lg">⏱</span>
            <span className="font-mono text-xl font-bold tracking-tight">
              {formatTime(workoutSeconds)}
            </span>
            <button
              onClick={resetTimer}
              title="Reiniciar contador"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full border border-slate-700 transition-all active:scale-90 ml-1"
            >
              ↺
            </button>
          </div>

          <button
            onClick={toggleTraining}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95 ${
              isTraining
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-slate-950 hover:bg-slate-200'
            }`}
          >
            <span>{isTraining ? '⏸' : '▶'}</span>
            {isTraining ? 'Pausar' : 'Iniciar Entrenamiento'}
          </button>
        </div>

        {/* Selector de Días */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-5 max-w-md mx-auto w-full">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">{dayTitles[selectedDay]}</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">{selectedDay}</p>
        </div>

        {/* Card de Contador N/M y Barra de Progreso del Día */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 shadow-xl flex flex-col gap-2 backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span>🎯</span> Progreso de Series del Día
            </span>
            <span className="text-blue-400 font-mono text-sm">
              {completedSets} / {totalSets} ({progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800/80">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Lista de Ejercicios */}
        <div className="flex flex-col gap-5">
          {workoutData[selectedDay]?.map((exercise) => {
            const currentRest = restDisplays[exercise.id]
            const activeVar = exercise.activeVariant || exercise.name
            const activeSets = exercise.variantsData?.[activeVar] || []

            return (
              <div
                key={exercise.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col gap-4 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-white tracking-tight leading-tight">
                      {activeVar}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">
                      {exercise.muscle}
                    </span>
                  </div>

                  {/* Grupo de Botones: Variantes + 90s Rest */}
                  <div className="flex items-center gap-2">
                    {exercise.variants && exercise.variants.length > 1 && (
                      <button
                        onClick={() => setActiveModalEx(exercise)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-2.5 py-1.5 rounded-full border border-slate-700 font-semibold active:scale-95 transition-all"
                      >
                        Variantes ⚙️
                      </button>
                    )}

                    <button
                      onClick={() => startRestTimer(exercise.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all ${
                        currentRest === 'FIN'
                          ? 'bg-emerald-500 text-slate-950 font-black animate-bounce shadow-lg shadow-emerald-500/30'
                          : currentRest
                          ? 'bg-orange-500 text-slate-950 font-bold animate-pulse shadow-lg shadow-orange-500/20'
                          : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10'
                      }`}
                    >
                      <span>⏱</span>
                      {currentRest === 'FIN'
                        ? '¡LISTO!'
                        : currentRest
                        ? `${currentRest}s`
                        : '90s Rest'}
                    </button>
                  </div>
                </div>

                {/* Series */}
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-12 gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                    <span className="col-span-2 text-center">SERIE</span>
                    <span className="col-span-3 text-center">CARGA</span>
                    <span className="col-span-3 text-center">REPS</span>
                    <span className="col-span-2 text-center">RIR</span>
                    <span className="col-span-2 text-center">HECHO</span>
                  </div>

                  {activeSets.map((set, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-1.5 items-center bg-slate-950/40 p-1.5 rounded-xl border border-slate-900/50"
                    >
                      <span className="col-span-2 text-center font-bold text-xs text-slate-400">
                        S{index + 1}
                      </span>

                      {/* Input Carga */}
                      <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1.5 flex items-center justify-between focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.weight || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'weight', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      {/* Input Reps */}
                      <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'reps', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      {/* Input RIR */}
                      <div className="col-span-2 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="RIR 0"
                          value={set.rir || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'rir', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      {/* Botón Check Emoji Interactivos */}
                      <div className="col-span-2 flex justify-center">
                        <button
                          type="button"
                          onClick={() => toggleSetComplete(exercise.id, index)}
                          className={`w-full py-1.5 rounded-lg font-bold text-xs flex items-center justify-center transition-all active:scale-90 ${
                            set.completed
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                              : 'bg-slate-900/80 text-slate-600 border border-slate-800 hover:text-slate-400'
                          }`}
                          title={set.completed ? 'Serie completada' : 'Marcar serie'}
                        >
                          {set.completed ? '☑️' : '⬜'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Modal Desplegable de Variantes */}
      {activeModalEx && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Seleccionar Variante</h3>
            <p className="text-xs text-slate-400">Cada variante guarda sus pesos y series de forma independiente:</p>

            <div className="flex flex-col gap-2 my-2">
              {activeModalEx.variants?.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => selectVariant(activeModalEx.id, variant)}
                  className={`p-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    (activeModalEx.activeVariant || activeModalEx.name) === variant
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveModalEx(null)}
              className="mt-2 text-xs text-slate-400 text-center py-2 underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
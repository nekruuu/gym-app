import React, { useState, useEffect } from 'react'

const dayTitles = {
  Martes: 'Pecho, Hombros y Tríceps',
  Miércoles: 'Pierna Completa',
  Jueves: 'Espalda, Bíceps y Antebrazo',
  Viernes: 'Pierna y Enfoque Femoral',
  Sábado: 'Torso Completo'
}

const initialWorkoutData = {
  Martes: [
    {
      id: 'mar-1',
      name: 'Press Inclinado en Smith',
      muscle: 'Pecho',
      variants: ['Press Inclinado en Smith', 'Press Inclinado con Mancuernas'],
      sets: [
        { weight: '10kg/lado', reps: 'Calentamiento', rir: '' },
        { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' },
        { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' }
      ]
    },
    {
      id: 'mar-2',
      name: 'Peck Deck',
      muscle: 'Pecho',
      variants: ['Peck Deck', 'Cruce de Poleas Alta', 'Aperturas con Mancuernas'],
      sets: [
        { weight: '60kg', reps: '9', rir: 'Fallo' },
        { weight: '55kg', reps: '6', rir: 'Fallo' }
      ]
    },
    {
      id: 'mar-3',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas', 'Elevaciones Laterales en Máquina'],
      sets: [
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
      ]
    },
    {
      id: 'mar-4',
      name: 'Extension en polea baja con soga',
      muscle: 'Tríceps',
      variants: ['Extension en polea baja con soga', 'Extension en polea media con una mano'],
      sets: [
        { weight: '30kg', reps: '9', rir: 'Fallo' },
        { weight: '30kg', reps: '7', rir: 'Fallo' }
      ]
    },
    {
      id: 'mar-5',
      name: 'Extension en polea alta con una mano',
      muscle: 'Tríceps',
      variants: ['Extension en polea alta con una mano', 'Extensiones OverHead en Polea'],
      sets: [
        { weight: '3 ladrillos', reps: '6', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '8', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '8', rir: 'Fallo' }
      ]
    },
    {
      id: 'mar-6',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'mar-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      sets: [
        { weight: 'Corporal', reps: '12', rir: 'Fallo' },
        { weight: 'Corporal', reps: '12', rir: 'Fallo' }
      ]
    }
  ],
  Miércoles: [
    {
      id: 'mie-1',
      name: 'Máquina de gemelos',
      muscle: 'Gemelos',
      variants: ['Máquina de gemelos', 'Elevación de talones de pie'],
      sets: [
        { weight: '40kg', reps: '12', rir: '' },
        { weight: '70kg', reps: '10', rir: '' },
        { weight: '70kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'mie-2',
      name: 'Máquina de aductores',
      muscle: 'Aductores',
      variants: ['Máquina de aductores', 'Aductores en polea'],
      sets: [
        { weight: '30kg', reps: '12', rir: '' },
        { weight: '40kg', reps: '10', rir: '' },
        { weight: '40kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'mie-3',
      name: 'Sillón de cuádriceps',
      muscle: 'Cuádriceps',
      variants: ['Sillón de cuádriceps', 'Sentadilla hack', 'Prensa inclinada'],
      sets: [
        { weight: '50kg', reps: '12', rir: '' },
        { weight: '80kg', reps: '10', rir: '' },
        { weight: '80kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'mie-4',
      name: 'Péndulo',
      muscle: 'Cuádriceps',
      variants: ['Péndulo', 'Sentadilla hack', 'Prensa inclinada'],
      sets: [
        { weight: '20kg', reps: '10', rir: '' },
        { weight: '20kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'mie-5',
      name: 'Máquina de femoral sentado',
      muscle: 'Femoral',
      variants: ['Máquina de femoral sentado', 'Curl femoral de pie', 'Curl femoral acostado'],
      sets: [
        { weight: '50kg', reps: '12', rir: '' },
        { weight: '70kg', reps: '10', rir: '' },
        { weight: '70kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'mie-6',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'mie-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      sets: [
        { weight: 'Corporal', reps: '12', rir: 'Fallo' },
        { weight: 'Corporal', reps: '12', rir: 'Fallo' }
      ]
    }
  ],
  Jueves: [
    {
      id: 'jue-1',
      name: 'Pullover en máquina',
      muscle: 'Espalda',
      variants: ['Pullover en máquina', 'Pullover en polea'],
      sets: [
        { weight: '25kg/lado', reps: '12', rir: '' },
        { weight: '45kg/lado', reps: '10', rir: '' },
        { weight: '45kg/lado', reps: '10', rir: '' }
      ]
    },
    {
      id: 'jue-2',
      name: 'Jalon al pecho con agarre cerrado',
      muscle: 'Espalda',
      variants: ['Jalon al pecho con agarre cerrado', 'Jalon al pecho con agarre neutro'],
      sets: [
        { weight: '65kg', reps: '10', rir: '' },
        { weight: '65kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'jue-3',
      name: 'Barra T',
      muscle: 'Espalda',
      variants: ['Barra T', 'Remo con mancuerna'],
      sets: [
        { weight: '35kg', reps: '10', rir: '' },
        { weight: '35kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'jue-4',
      name: 'Curl predicador en máquina',
      muscle: 'Bíceps',
      variants: ['Curl predicador en máquina', 'Bicep alternado parado', 'Bicep alternado sentado'],
      sets: [
        { weight: '20kg', reps: '12', rir: '' },
        { weight: '30kg', reps: '10', rir: '' },
        { weight: '30kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'jue-5',
      name: 'Bicep alternado parado',
      muscle: 'Bíceps',
      variants: ['Bicep alternado parado', 'Bicep alternado sentado'],
      sets: [
        { weight: '15kg/lado', reps: '10', rir: '' },
        { weight: '15kg/lado', reps: '10', rir: '' }
      ]
    },
    {
      id: 'jue-6',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas', 'Elevaciones Laterales en Máquina'],
      sets: [
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
      ]
    },
    {
      id: 'jue-7',
      name: 'Antebrazo polea baja',
      muscle: 'Antebrazo',
      variants: ['Antebrazo polea baja', 'Curl de antebrazo con barra'],
      sets: [
        { weight: '25kg', reps: '12', rir: '' },
        { weight: '25kg', reps: '12', rir: '' }
      ]
    },
    {
      id: 'jue-8',
      name: 'Antebrazo polea alta',
      muscle: 'Antebrazo',
      variants: ['Antebrazo polea alta', 'Curl invertido en polea'],
      sets: [
        { weight: '50kg', reps: '12', rir: '' },
        { weight: '50kg', reps: '12', rir: '' }
      ]
    },
    {
      id: 'jue-9',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'jue-10',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      sets: [
        { weight: 'Corporal', reps: '12', rir: 'Fallo' },
        { weight: 'Corporal', reps: '12', rir: 'Fallo' }
      ]
    }
  ],
  Viernes: [
    {
      id: 'vie-1',
      name: 'Máquina de gemelos',
      muscle: 'Gemelos',
      variants: ['Máquina de gemelos', 'Elevación de talones de pie'],
      sets: [
        { weight: '40kg', reps: '12', rir: '' },
        { weight: '70kg', reps: '10', rir: '' },
        { weight: '70kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'vie-2',
      name: 'Máquina de aductores',
      muscle: 'Aductores',
      variants: ['Máquina de aductores', 'Aductores en polea'],
      sets: [
        { weight: '30kg', reps: '12', rir: '' },
        { weight: '40kg', reps: '10', rir: '' },
        { weight: '40kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'vie-3',
      name: 'Femoral parado',
      muscle: 'Femoral',
      variants: ['Femoral parado', 'Curl femoral acostado'],
      sets: [
        { weight: '10kg/lado', reps: '12', rir: '' },
        { weight: '20kg/lado', reps: '10', rir: '' },
        { weight: '20kg/lado', reps: '10', rir: '' }
      ]
    },
    {
      id: 'vie-4',
      name: 'Máquina de femoral sentado',
      muscle: 'Femoral',
      variants: ['Máquina de femoral sentado', 'Curl femoral acostado'],
      sets: [
        { weight: '70kg', reps: '10', rir: '' },
        { weight: '70kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'vie-5',
      name: 'Sillón de cuádriceps',
      muscle: 'Cuádriceps',
      variants: ['Sillón de cuádriceps', 'Sentadilla hack', 'Prensa inclinada'],
      sets: [
        { weight: '50kg', reps: '12', rir: '' },
        { weight: '80kg', reps: '10', rir: '' },
        { weight: '80kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'vie-6',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'vie-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      sets: [
        { weight: 'Corporal', reps: '12', rir: 'Fallo' },
        { weight: 'Corporal', reps: '12', rir: 'Fallo' }
      ]
    }
  ],
  Sábado: [
    {
      id: 'sab-1',
      name: 'Press Inclinado en Smith',
      muscle: 'Pecho',
      variants: ['Press Inclinado en Smith', 'Press Inclinado con Mancuernas'],
      sets: [
        { weight: '10kg/lado', reps: 'Calentamiento', rir: '' },
        { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' },
        { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' }
      ]
    },
    {
      id: 'sab-2',
      name: 'Jalon al pecho con agarre cerrado',
      muscle: 'Espalda',
      variants: ['Jalon al pecho con agarre cerrado', 'Jalon al pecho con agarre neutro', 'Pullover en polea'],
      sets: [
        { weight: '40kg', reps: '12', rir: '' },
        { weight: '65kg', reps: '10', rir: '' },
        { weight: '65kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'sab-3',
      name: 'Peck Deck',
      muscle: 'Pecho',
      variants: ['Peck Deck', 'Cruce de Poleas Alta', 'Aperturas con Mancuernas'],
      sets: [
        { weight: '60kg', reps: '9', rir: 'Fallo' },
        { weight: '55kg', reps: '6', rir: 'Fallo' }
      ]
    },
    {
      id: 'sab-4',
      name: 'Barra T',
      muscle: 'Espalda',
      variants: ['Barra T', 'Remo con mancuerna'],
      sets: [
        { weight: '35kg', reps: '10', rir: '' },
        { weight: '35kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'sab-5',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas', 'Elevaciones Laterales en Máquina'],
      sets: [
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
      ]
    },
    {
      id: 'sab-6',
      name: 'Extension en polea baja con soga',
      muscle: 'Tríceps',
      variants: ['Extension en polea baja con soga', 'Extension en polea media con una mano'],
      sets: [
        { weight: '20kg', reps: '12', rir: '' },
        { weight: '30kg', reps: '9', rir: 'Fallo' },
        { weight: '30kg', reps: '7', rir: 'Fallo' }
      ]
    },
    {
      id: 'sab-7',
      name: 'Curl predicador en máquina',
      muscle: 'Bíceps',
      variants: ['Curl predicador en máquina', 'Bicep alternado parado'],
      sets: [
        { weight: '20kg', reps: '12', rir: '' },
        { weight: '30kg', reps: '10', rir: '' },
        { weight: '30kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'sab-8',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta', 'Crunches en Esterilla'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'sab-9',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion', 'Elevación de piernas colgado'],
      sets: [
        { weight: 'Corporal', reps: '12', rir: 'Fallo' },
        { weight: 'Corporal', reps: '12', rir: 'Fallo' }
      ]
    }
  ]
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState('Martes')

  const [workoutData, setWorkoutData] = useState(() => {
    const saved = localStorage.getItem('gym_workout_data_v5')
    return saved ? JSON.parse(saved) : initialWorkoutData
  })

  const [startTime, setStartTime] = useState(() => {
    const savedTime = localStorage.getItem('gym_start_time')
    return savedTime ? Number(savedTime) : null
  })
  const [workoutSeconds, setWorkoutSeconds] = useState(0)

  const [restTargets, setRestTargets] = useState(() => {
    const savedRests = localStorage.getItem('gym_rest_targets')
    return savedRests ? JSON.parse(savedRests) : {}
  })
  const [restDisplays, setRestDisplays] = useState({})
  const [activeModalEx, setActiveModalEx] = useState(null)

  useEffect(() => {
    localStorage.setItem('gym_workout_data_v5', JSON.stringify(workoutData))
  }, [workoutData])

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

  useEffect(() => {
    if (!startTime) {
      setWorkoutSeconds(0)
      return
    }
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setWorkoutSeconds(elapsed > 0 ? elapsed : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [startTime])

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

  const toggleTraining = () => {
    if (startTime) {
      setStartTime(null)
    } else {
      setStartTime(Date.now())
    }
  }

  const resetTimer = () => {
    setStartTime(null)
    setWorkoutSeconds(0)
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

  const updateSet = (exerciseId, setIndex, field, value) => {
    setWorkoutData((prevData) => {
      const currentDayData = prevData[selectedDay] || []
      const updatedDayData = currentDayData.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.map((set, idx) => {
            if (idx === setIndex) {
              return { ...set, [field]: value }
            }
            return set
          })
          return { ...exercise, sets: updatedSets }
        }
        return exercise
      })
      return { ...prevData, [selectedDay]: updatedDayData }
    })
  }

  const selectVariant = (exerciseId, newName) => {
    setWorkoutData((prevData) => {
      const currentDayData = prevData[selectedDay] || []
      const updatedDayData = currentDayData.map((ex) => {
        if (ex.id === exerciseId) {
          return { ...ex, name: newName }
        }
        return ex
      })
      return { ...prevData, [selectedDay]: updatedDayData }
    })
    setActiveModalEx(null)
  }

  // Cálculo de progreso de series del día
  const currentExercises = workoutData[selectedDay] || []
  const totalSets = currentExercises.reduce((acc, ex) => acc + ex.sets.length, 0)
  const completedSets = currentExercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.reps && s.weight).length,
    0
  )
  const progressPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-16 selection:bg-blue-500/30">
      {/* Fondo con brillo ambiental */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-slate-950 to-slate-950 pointer-events-none z-0" />

      {/* Header Fijo */}
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/60 px-4 pt-3 pb-2 flex flex-col gap-3">
        <div className="flex justify-between items-center max-w-md mx-auto w-full">
          {/* Chip de Tiempo en Vivo */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full shadow-inner">
            <span className={`w-2.5 h-2.5 rounded-full ${startTime ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
            <span className="font-mono text-sm font-extrabold tracking-wider text-slate-200">
              {formatTime(workoutSeconds)}
            </span>
            <button
              onClick={resetTimer}
              title="Reiniciar contador"
              className="text-xs text-slate-400 hover:text-white transition-colors ml-1 active:scale-90"
            >
              ↺
            </button>
          </div>

          {/* Botón Principal de Entrenamiento */}
          <button
            onClick={toggleTraining}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs tracking-wide shadow-lg transition-all active:scale-95 ${
              startTime
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/25 ring-2 ring-red-500/30'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-600/30 ring-2 ring-blue-500/30'
            }`}
          >
            <span>{startTime ? '⏸' : '▶'}</span>
            {startTime ? 'Pausar' : 'Iniciar Sesión'}
          </button>
        </div>

        {/* Selector de Días */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 max-w-md mx-auto w-full">
          {['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800/80 hover:bg-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="relative z-10 flex-1 px-4 py-5 flex flex-col gap-5 max-w-md mx-auto w-full">
        {/* Banner de Título & Barra de Progreso */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                {selectedDay}
              </span>
              <h1 className="text-xl font-black text-white tracking-tight leading-none">
                {dayTitles[selectedDay]}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400">
                {completedSets}/{totalSets} series
              </span>
            </div>
          </div>

          {/* Barra Visual de Progreso */}
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/60 p-0.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-blue-500/50"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Lista de Ejercicios */}
        <div className="flex flex-col gap-4">
          {workoutData[selectedDay]?.map((exercise) => {
            const currentRest = restDisplays[exercise.id]

            return (
              <div
                key={exercise.id}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-xl flex flex-col gap-4 hover:border-slate-700/60 transition-all"
              >
                {/* Encabezado del Ejercicio */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-base text-white tracking-tight truncate leading-snug">
                      {exercise.name}
                    </h3>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-950/60 px-2 py-0.5 rounded-md border border-slate-800/50 mt-1">
                      {exercise.muscle}
                    </span>
                  </div>

                  {/* Acciones: Variantes & Temporizador */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setActiveModalEx(exercise)}
                      className="text-[11px] bg-slate-800/80 hover:bg-slate-700/80 text-blue-400 px-2.5 py-1.5 rounded-full border border-slate-700/70 font-semibold active:scale-95 transition-all shadow-sm"
                    >
                      Variantes ⚙️
                    </button>

                    <button
                      onClick={() => startRestTimer(exercise.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold active:scale-95 transition-all shadow-sm ${
                        currentRest === 'FIN'
                          ? 'bg-emerald-500 text-slate-950 font-black animate-bounce shadow-emerald-500/40 ring-2 ring-emerald-400'
                          : currentRest
                          ? 'bg-amber-500 text-slate-950 font-extrabold animate-pulse shadow-amber-500/30'
                          : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
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

                {/* Grid de Series */}
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-12 gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">
                    <span className="col-span-2 text-center">SERIE</span>
                    <span className="col-span-4 text-center">CARGA</span>
                    <span className="col-span-3 text-center">REPS</span>
                    <span className="col-span-3 text-center">RIR</span>
                  </div>

                  {exercise.sets.map((set, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 items-center bg-slate-950/60 p-1.5 rounded-xl border border-slate-900/80 hover:border-slate-800 transition-colors"
                    >
                      <span className="col-span-2 text-center font-bold text-xs text-slate-400">
                        S{index + 1}
                      </span>

                      <div className="col-span-4 bg-slate-900/90 border border-slate-800/80 rounded-lg py-1.5 px-2 flex items-center justify-between focus-within:border-blue-500/70 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.weight || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'weight', e.target.value)}
                          className="w-full bg-transparent text-center font-mono font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="col-span-3 bg-slate-900/90 border border-slate-800/80 rounded-lg py-1.5 px-1 focus-within:border-blue-500/70 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'reps', e.target.value)}
                          className="w-full bg-transparent text-center font-mono font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="col-span-3 bg-slate-900/90 border border-slate-800/80 rounded-lg py-1.5 px-1 focus-within:border-blue-500/70 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                        <input
                          type="text"
                          placeholder="RIR 0"
                          value={set.rir || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'rir', e.target.value)}
                          className="w-full bg-transparent text-center font-mono font-bold text-white text-xs focus:outline-none"
                        />
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800/90 rounded-3xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-2xl shadow-blue-500/10">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">Cambiar Variante</h3>
              <p className="text-xs text-slate-400 mt-0.5">Selecciona el movimiento de hoy:</p>
            </div>

            <div className="flex flex-col gap-2.5 my-1">
              {activeModalEx.variants?.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => selectVariant(activeModalEx.id, variant)}
                  className={`p-3.5 rounded-2xl text-left text-xs font-bold transition-all active:scale-98 ${
                    activeModalEx.name === variant
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveModalEx(null)}
              className="mt-1 text-xs font-semibold text-slate-400 hover:text-white text-center py-2 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
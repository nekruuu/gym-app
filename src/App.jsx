import React, { useState, useEffect } from 'react'

// Rutina actualizada con todas las correcciones, variantes y abdominales al final
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
      variants: ['Laterales en polea', 'Elevaciones Laterales con Mancuernas'],
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
      variants: ['Máquina de aductores'],
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
      variants: ['Abdominales en polea alta'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'mie-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion'],
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
      variants: ['Laterales en polea'],
      sets: [
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
        { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
      ]
    },
    {
      id: 'jue-7',
      name: 'Antebrazo polea baja',
      muscle: 'Antebrazo',
      variants: ['Antebrazo polea baja'],
      sets: [
        { weight: '25kg', reps: '12', rir: '' },
        { weight: '25kg', reps: '12', rir: '' }
      ]
    },
    {
      id: 'jue-8',
      name: 'Antebrazo polea alta',
      muscle: 'Antebrazo',
      variants: ['Antebrazo polea alta'],
      sets: [
        { weight: '50kg', reps: '12', rir: '' },
        { weight: '50kg', reps: '12', rir: '' }
      ]
    },
    {
      id: 'jue-9',
      name: 'Abdominales en polea alta',
      muscle: 'Abdomen',
      variants: ['Abdominales en polea alta'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'jue-10',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion'],
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
      variants: ['Máquina de gemelos'],
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
      variants: ['Máquina de aductores'],
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
      variants: ['Sillón de cuádriceps'],
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
      variants: ['Abdominales en polea alta'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'vie-7',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion'],
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
      variants: ['Peck Deck'],
      sets: [
        { weight: '60kg', reps: '9', rir: 'Fallo' },
        { weight: '55kg', reps: '6', rir: 'Fallo' }
      ]
    },
    {
      id: 'sab-4',
      name: 'Barra T',
      muscle: 'Espalda',
      variants: ['Barra T'],
      sets: [
        { weight: '35kg', reps: '10', rir: '' },
        { weight: '35kg', reps: '10', rir: '' }
      ]
    },
    {
      id: 'sab-5',
      name: 'Laterales en polea',
      muscle: 'Hombro',
      variants: ['Laterales en polea'],
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
      variants: ['Abdominales en polea alta'],
      sets: [
        { weight: '50kg', reps: '15', rir: 'Fallo' },
        { weight: '50kg', reps: '15', rir: 'Fallo' }
      ]
    },
    {
      id: 'sab-9',
      name: 'Elevaciones de piernas en inclinacion',
      muscle: 'Abdomen',
      variants: ['Elevaciones de piernas en inclinacion'],
      sets: [
        { weight: 'Corporal', reps: '12', rir: 'Fallo' },
        { weight: 'Corporal', reps: '12', rir: 'Fallo' }
      ]
    }
  ]
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState('Martes')

  // Persistencia de Rutina en localStorage (si hay cambios previos los rescata, si no usa initialWorkoutData)
  const [workoutData, setWorkoutData] = useState(() => {
    const saved = localStorage.getItem('gym_workout_data_v2')
    return saved ? JSON.parse(saved) : initialWorkoutData
  })

  // Control del Temporizador de Entrenamiento con Timestamp
  const [startTime, setStartTime] = useState(() => {
    const savedTime = localStorage.getItem('gym_start_time')
    return savedTime ? Number(savedTime) : null
  })
  const [workoutSeconds, setWorkoutSeconds] = useState(0)

  // Control del Timer de Descanso con Timestamps por ejercicio
  const [restTargets, setRestTargets] = useState(() => {
    const savedRests = localStorage.getItem('gym_rest_targets')
    return savedRests ? JSON.parse(savedRests) : {}
  })
  const [restDisplays, setRestDisplays] = useState({})

  // Modal para Variantes de Ejercicios
  const [activeModalEx, setActiveModalEx] = useState(null)

  // Sincronización continua con localStorage
  useEffect(() => {
    localStorage.setItem('gym_workout_data_v2', JSON.stringify(workoutData))
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

  // Temporizador principal de entrenamiento (basado en Date.now())
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

  // Temporizador de descanso (basado en Date.now())
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
        [exerciseId]: Date.now() + 90000 // 90 segundos a futuro
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
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full border border-slate-700 transition-all active:scale-90"
            >
              ↺
            </button>
          </div>

          <button
            onClick={toggleTraining}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95 ${
              startTime
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-slate-950 hover:bg-slate-200'
            }`}
          >
            <span>{startTime ? '⏸' : '▶'}</span>
            {startTime ? 'Pausar' : 'Iniciar Entrenamiento'}
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
      <main className="flex-1 px-4 py-4 flex flex-col gap-6 max-w-md mx-auto w-full">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">{selectedDay}</h1>
        </div>

        {/* Lista de Ejercicios */}
        <div className="flex flex-col gap-5">
          {workoutData[selectedDay]?.map((exercise) => {
            const currentRest = restDisplays[exercise.id]

            return (
              <div
                key={exercise.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col gap-4 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-white tracking-tight leading-tight">
                        {exercise.name}
                      </h3>
                      {exercise.variants && exercise.variants.length > 1 && (
                        <button
                          onClick={() => setActiveModalEx(exercise)}
                          className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded-md border border-slate-700 font-semibold"
                        >
                          Variantes ⚙️
                        </button>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">
                      {exercise.muscle}
                    </span>
                  </div>

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
                      ? '¡LISTO! 🏋️'
                      : currentRest
                      ? `${currentRest}s Rest`
                      : '90s Rest'}
                  </button>
                </div>

                {/* Series */}
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                    <span className="col-span-2 text-center">SERIE</span>
                    <span className="col-span-4 text-center">CARGA</span>
                    <span className="col-span-3 text-center">REPS</span>
                    <span className="col-span-3 text-center">RIR</span>
                  </div>

                  {exercise.sets.map((set, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 items-center bg-slate-950/40 p-1.5 rounded-xl border border-slate-900/50"
                    >
                      <span className="col-span-2 text-center font-bold text-xs text-slate-400">
                        S{index + 1}
                      </span>

                      <div className="col-span-4 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-2 flex items-center justify-between focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.weight || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'weight', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'reps', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="RIR 0"
                          value={set.rir || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'rir', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Seleccionar Variante</h3>
            <p className="text-xs text-slate-400">Selecciona el ejercicio que vas a realizar hoy:</p>

            <div className="flex flex-col gap-2 my-2">
              {activeModalEx.variants?.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => selectVariant(activeModalEx.id, variant)}
                  className={`p-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    activeModalEx.name === variant
                      ? 'bg-blue-600 text-white'
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
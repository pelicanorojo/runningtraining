/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T09:50:10-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-28T09:50:39-03:00
 */
import { TrainingData } from "@/types/global";

export const aSampleTrainingData = {
  "trainingDate": "2017-10-07",
  "workoutName": "FINALIZAR MÁS RÁPIDO - 1/2 MARATÓN",
  "order": 3,
  "recommendedTime": 1800,
  "intervals": [
    {
      "intervalType": "warmUp",
      "totalTimeInZone": 300,
      "miCoachZone": "blue"
    },
    {
      "intervalType": "middle",
      "totalTimeInZone": 1200,
      "miCoachZone": "green"
    },
    {
      "intervalType": "coolDown",
      "totalTimeInZone": 300,
      "miCoachZone": "blue"
    }
  ],
  "trainingNotes": {
    "noteSummary": "Carrera verde.",
    "note": "Calienta y haz un poco de footing sencillo, y después acelera hasta alcanzar la velocidad de tu zona verde.",
    "secondaryNote": "Prepara tu equipo para el día de la carrera: las mismas zapatillas y ropa, todo el buen equipo con el que te has ejercitado. Nada nuevo. ¡Disfruta!. ¡BUENA SUERTE!"
  }
} as TrainingData;

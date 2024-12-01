/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T09:50:10-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-30T12:06:44-03:00
 */
import { TrainingData, PlanData } from "@/types/global";

export const aSampleTrainingData: TrainingData = {
  "trainingDate": "2017-10-07",
  "workoutName": "FINALIZAR MÁS RÁPIDO - 1/2 MARATÓN",
  "order": 3,
  "recommendedTime": 1800,
  "intervals": [
    {
      "intervalType": "warmUp",
      "totalTimeInZone": 300,
      "zone": "blue"
    },
    {
      "intervalType": "middle",
      "totalTimeInZone": 1200,
      "zone": "green"
    },
    {
      "intervalType": "coolDown",
      "totalTimeInZone": 300,
      "zone": "blue"
    }
  ],
  "trainingNotes": {
    "noteSummary": "Carrera verde.",
    "note": "Calienta y haz un poco de footing sencillo, y después acelera hasta alcanzar la velocidad de tu zona verde.",
    "secondaryNote": "Prepara tu equipo para el día de la carrera: las mismas zapatillas y ropa, todo el buen equipo con el que te has ejercitado. Nada nuevo. ¡Disfruta!. ¡BUENA SUERTE!"
  }
};

export const aLongSampleTrainingData: PlanData = [
    {
    "trainingDate": "2017-10-07",
    "workoutName": "FINALIZAR MÁS RÁPIDO - 1/2 MARATÓN",
    "order": 3,
    "recommendedTime": 1800,
    "intervals": [
      {
        "intervalType": "warmUp",
        "totalTimeInZone": 300,
        "zone": "blue"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 1200,
        "zone": "green"
      },
      {
        "intervalType": "coolDown",
        "totalTimeInZone": 300,
        "zone": "blue"
      }
    ],
    "trainingNotes": {
      "noteSummary": "Carrera verde.",
      "note": "Calienta y haz un poco de footing sencillo, y después acelera hasta alcanzar la velocidad de tu zona verde.",
      "secondaryNote": "Prepara tu equipo para el día de la carrera: las mismas zapatillas y ropa, todo el buen equipo con el que te has ejercitado. Nada nuevo. ¡Disfruta!. ¡BUENA SUERTE!"
    }
  },
  {
    "trainingDate": "2017-10-03",
    "workoutName": "FINALIZAR MÁS RÁPIDO - 1/2 MARATÓN",
    "order": 2,
    "recommendedTime": 1800,
    "intervals": [
      {
        "intervalType": "warmUp",
        "totalTimeInZone": 300,
        "zone": "blue"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "red"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "red"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "red"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 60,
        "zone": "yellow"
      },
      {
        "intervalType": "coolDown",
        "totalTimeInZone": 300,
        "zone": "blue"
      }
    ],
    "trainingNotes": {
      "noteSummary": "Intervalos en la zona amarilla Fartlek.",
      "note": "Estas zonas amarillas se corren a tu ritmo de carrera de 5 km.",
      "secondaryNote": "Corre rápido en cada zona amarilla pero no te pares para recuperarte en la verde. Sigue corriendo aunque necesites reducir el ritmo hasta hacer footing."
    }
  },
  {
    "trainingDate": "2017-10-03",
    "workoutName": "FINALIZAR MÁS RÁPIDO - 1/2 MARATÓN",
    "order": 1,
    "recommendedTime": 1920,
    "intervals": [
      {
        "intervalType": "warmUp",
        "totalTimeInZone": 300,
        "zone": "blue"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 90,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 240,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 90,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 240,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 90,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 240,
        "zone": "yellow"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 90,
        "zone": "green"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 240,
        "zone": "yellow"
      },
      {
        "intervalType": "coolDown",
        "totalTimeInZone": 300,
        "zone": "blue"
      }
    ],
    "trainingNotes": {
      "noteSummary": "Intervalos de ritmo controlado en la zona amarilla.",
      "note": "Corre cada zona amarilla a tu ritmo de carrera de entre 8 y 12 km.",
      "secondaryNote": "Permanece en las zonas. Corre intensamente en cada zona amarilla y utiliza las zonas verdes para recuperarte. Este entrenamiento será duro; realiza una serie cada vez."
    }
  }
];
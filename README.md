# 🎈 SB Maps — Space Balloon Tracker

> *A live map for following a high-altitude balloon from launch to splashdown.*

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?logo=jupyter&logoColor=white)


## 🌟 Highlights

- 🗺️ **Live position on a map** — the balloon's marker moves across GSI (Geospatial Information Authority of Japan) map tiles
- 📈 **Flight dashboard** — altitude meter up to 33 km and a mission timer
- 🧪 **Simulation mode** — plays back a full flight (ascent → burst → free fall → parachute descent) along with the predicted landing point
- 🎥 **Follow view** — a toggle keeps the map centered on the balloon
- 🖼️ **Latest image panel** — shows the newest photo from the payload (a sample image in this prototype)


## ℹ️ Overview

**SB** stands for **Space Balloon**. Nearly 100 members of the Aichi Prefectural Asahigaoka High School **Astronomy Club (旭丘高校天文部)** built and launched a stratospheric balloon to about 30 km altitude, working with nine partner companies and organizations, including Sony Semiconductor Solutions. The project won a **National Excellence Award** at the National High School Student Project Awards.

This repository holds a prototype web page for tracking the flight:

| File | What it does |
| --- | --- |
| `index.html` + `simulation_demo.js` | Flight **simulation**: climbs at 4 m/s to 35 km, bursts, falls, opens a parachute at 500 m and lands, with the predicted landing point drawn on the map |
| `index1.html` + `first.js` | **Live tracking** from a device's GPS (`navigator.geolocation`) |
| `simulation.ipynb`, `simulation1.ipynb` | SymPy notebooks for experimenting with the differential equations used in trajectory modeling |

See also: [**SBmap_prediction**](https://github.com/pe-tanman/SBmap_prediction), which stores flight telemetry and experiments with altitude prediction.


### ✍️ Author

[Yuki Ishihara](https://github.com/pe-tanman), communications team and project management for the Asahigaoka High School Space Balloon Project.


## 🚀 Usage

No build step is needed. Serve the folder and open it in a browser:

```bash
git clone https://github.com/pe-tanman/SB_maps.git
cd SB_maps
python3 -m http.server 8000
```

- Simulation: <http://localhost:8000/index.html>
- Live GPS tracking: <http://localhost:8000/index1.html> (allow location access)

> [!NOTE]
> Browsers only allow geolocation on `localhost` or HTTPS.

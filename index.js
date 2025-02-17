const { error } = require("console");
const { parse } = require("csv-parse");
const fs = require("fs");
const habitalPlanets = [];
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitalPlanets.push(data);
    }
  })

  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(
      habitalPlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${habitalPlanets.length} habitable planets found`);
  });

let gm = window.gm;
// gives default values except those
// that were set manually...
// allows for 1 level of catagorization
// if more is needed, iterate code
for (const n in gm.obj) // loop thru objs
  for (const m in gm.data) // loop thru data (might need another layer)
    if (m === gm.obj[n].proto)
      // if proto was found in data
      for (const t in gm.data[m])
        if (gm.obj[n].hasOwnProperty(t)) continue;
        // ignore if set manually
        else gm.obj[n][t] = gm.data[m][t];
    else
      for (const w in gm.data[m]) // try 1 level deeper
        if (w === gm.obj[n].proto)
          for (const q in gm.data[m][w])
            if (gm.obj[n].hasOwnProperty(q)) continue;
            // ignore if set manually
            else gm.obj[n][q] = gm.data[m][w][q];

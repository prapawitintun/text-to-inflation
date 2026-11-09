# Text to inflation · Panel & Assembly Studio

Prapawit (Pam) Intun’s browser-based textile geometry and fabrication prototype.

[Launch the studio](https://prapawitintun.github.io/text-to-inflation/) · [Fabricademy Week 08](https://class.textile-academy.org/2027/prapawit-pam/assignments/week08/)

The standalone `AAG_Textile_Studio_2026.html` contains the application and embedded model/source downloads. It imports OBJ, STL, and 3DM meshes, prepares numbered panels and seam allowances, and exports DXF layouts and CSV assembly information. It runs in the browser.

Text-to-inflation is the research direction. The current application prepares geometry; it does not accept text prompts or simulate inflation, pressure, material behavior, or seam strength.

`week08.md` contains the Fabricademy documentation with captioned images and five Vimeo embeds. Optimized images are in `images/week08/`. Credits are recorded beside each image and in the documentation.

GitHub Pages serves the repository root from `main`. `.nojekyll` serves the app as static files. `index.html` opens the standalone app.

## Structural study

`studio.html` combines the original pattern editor with `structure-analysis.html`. The analytical model (`analysis-model.js`) calculates ideal cylinder/sphere membrane forces and stresses from gauge pressure, inflated radius, and thickness. The UI (`analysis-ui.js`) includes a pressure sweep, a fixed color scale, input validation, and optional comparison to user-entered fabric/seam strip strengths.

This is an equilibrium calculation in prescribed ideal geometry, not FEA, nonlinear form-finding, or analysis of the uploaded mesh. Example inputs and comparison factor are illustrative. Equations and model boundaries are documented in the tool and Week 08 page.

The Week 08 research update includes credited Speech to Reality and MechStyle videos, their primary research links, and Pam’s Pneuhaus engineering-lecture photograph.

## Analysis connected to the pattern mesh

The Structural study tab now loads `model-analysis.html`. `studio.html` loads the original standalone app and appends the same-origin helper `model-bridge.js` after the editor loads, preserving the original source file. A checked postMessage exchange transfers the current scaled vertices and triangles to the analysis tab. The direct analysis page can also load the original 800 / 1,600 / 3,200-face supplied approximations or a closed OBJ/STL mesh.

`mesh-membrane.js` implements an educational nonlinear triangular surface-membrane energy and gradient, plane-stress St Venant–Kirchhoff elasticity, optional tension-field energy relaxation, pressure potential, fixed vertex constraints, and an L-BFGS minimizer with load increments. `mesh-worker.js` runs the solve off the UI thread. Non-converged maps are withheld. Face values, displacement, residual, supports, assumptions, and the reference mesh can be exported as JSON.

The supplied three-dimensional mesh is treated as an unstressed reference surface. Material constants, scale, and the default support band are illustrative; seams, anisotropy, self-contact, and physical capacity are not modeled. Numerical checks include energy-gradient differences, an affine-strain patch test, zero load, fixed supports, closed topology, and an inflated-sphere/Laplace comparison. These checks do not constitute validation against Pam’s fabricated samples.

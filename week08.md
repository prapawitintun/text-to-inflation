# Soft robotics

## What if we could control inflatable structures through text?

This week, I explored how silicone, fabric, stitching, and air can turn flat materials into moving forms. I tested different ways of joining materials, made nylon prototypes, and connected these physical experiments to a longer-term question: could text become an interface for designing inflatable structures?

## 1. Objective

My aim was to learn through making: explore 3D-printed molds, compare sewn and bonded silicone assemblies, and test how a hand-drawn pattern behaves when made in nylon. Alongside these experiments, I began connecting digital fabrication tools to my interest in text-to-inflation for my final project.

## 2. Research and inspiration

### Learning from Porpla

Talking with Pattaraporn (Porpla) Kittisapkajon, a Fabricademy alumna, sparked my curiosity about combining silicone and fabric. Her soft robotics documentation became a reference for my own material experiments.

[Read Porpla’s Week 08 documentation](https://class.textile-academy.org/2026/pattaraporn-kittisapkajon/assignments/week08/).

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/porpla-silicone-inflation-reference.jpg" alt="A grid of nine silicone inflation samples showing different chamber and surface patterns" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Inspiration reference reproduced from Porpla’s soft robotics documentation. Credit: Pattaraporn (Porpla) Kittisapkajon; see the linked source above.</figcaption>
</figure>

### Pneuhaus: building with air

I also attended a Pneuhaus lecture at Harvard Graduate School of Design. Seeing their approach to inflatable structures helped me think about air as part of a fabrication process, from small material tests to spatial assemblies.

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/pneuhaus-building-with-air-lecture.jpg" alt="Lecture screen announcing PNEUHAUS: Building with Air at Harvard GSD" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Pneuhaus, “Building with Air,” Harvard GSD. Photo: Prapawit (Pam) Intun; lecture content and work: Pneuhaus.</figcaption>
</figure>

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/pneuhaus-design-process.jpg" alt="Projected lecture slide with digital models and a physical inflatable form" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Digital and physical form studies presented in the lecture. Photo: Prapawit (Pam) Intun; work shown: Pneuhaus.</figcaption>
</figure>

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/pneuhaus-inflatable-structures.jpg" alt="Projected examples of branching and arch-shaped inflatable structures" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Inflatable structures and branching forms from the lecture. Photo: Prapawit (Pam) Intun; work shown: Pneuhaus.</figcaption>
</figure>

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/pneuhaus-inflatable-installation.jpg" alt="A white inflated modular assembly beside a projected lecture slide" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>An inflatable assembly shown during the event. Photo: Prapawit (Pam) Intun; work shown: Pneuhaus.</figcaption>
</figure>


### Neil Gershenfeld and collaborators: from language to fabrication

Neil’s teaching encouraged me to ask how we might fabricate almost anything using air. A direct research connection is **Speech to Reality**, by Alexander Htet Kyaw, Miana Smith, Se Hwan Jeon, and Neil Gershenfeld (ACM SCF 2025). It connects natural-language input, a generated 3D mesh, geometric processing, and robotic assembly. The geometry is checked against assembly constraints before the robot builds it. [Read the published paper](https://doi.org/10.1145/3745778.3766670) · [Author’s project page](https://alexanderhtetkyaw.com/speech-to-reality/).

<div style="position:relative;width:100%;aspect-ratio:16/9;margin:1.5rem 0;">
  <iframe src="https://www.youtube-nocookie.com/embed/RbrPrU9teNM" title="Speech to Reality — research demonstration by Alexander Htet Kyaw and collaborators, including Neil Gershenfeld" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture;encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Research demonstration from Alexander Htet Kyaw’s channel; credited to the research team above. [Watch on YouTube](https://www.youtube.com/watch?v=RbrPrU9teNM).

**How I connect this to my work:** I want to translate a request into textile geometry, fabricable panels, sewn or bonded assemblies, and an inflated form. That is my proposed extension of the prompt-to-fabrication idea; the demonstrated research uses modular robotic assembly. My constraints would include material direction, seam construction, airtightness, pressure, and the difference between a flat cutting pattern and its inflated shape.

### Mechanical feedback: MechStyle

A second connection is **MechStyle** (ACM SCF 2025), by Faraz Faruqi, Amira Abdel-Rahman, Leandra Tejedor, Martin Nisser, Jiaji Li, Vrushank Phadnis, Varun Jampani, Neil Gershenfeld, Megan Hofmann, and Stefanie Mueller. It feeds finite element analysis (FEA) results back into text-driven stylization, reducing geometric changes in regions experiencing higher stress. Its examples concern solid 3D-printed objects, so applying the idea to an inflatable would require a different material model and loading setup. [Read the researchers’ project page and paper](https://hcie.csail.mit.edu/research/mechstyle/mechstyle.html).

<div style="position:relative;width:100%;aspect-ratio:16/9;margin:1.5rem 0;">
  <iframe src="https://www.youtube-nocookie.com/embed/3BEZYZ86DNQ" title="MechStyle — generative design with mechanical simulation, research video from MIT HCI Engineering" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture;encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Video linked from the MechStyle research project. [Watch on YouTube](https://www.youtube.com/watch?v=3BEZYZ86DNQ).

**My research question:** could structural feedback guide a text-to-inflation workflow before I cut fabric? For example, a requested shape might need a larger tube radius, different seams, reinforcement, or revised supports. Those changes would need simulation and physical validation rather than visual similarity alone.

A related 2025 workshop paper by Kyaw, Jeon, Smith, and Gershenfeld, [Making Physical Objects with Generative AI and Robotic Assembly](https://arxiv.org/abs/2504.19131), evaluates fabrication constraints, time, sustainability, functionality, and accessibility. I can use those five questions to assess my own workflow: can it be made, how long does it take, what material is used, does it perform as intended, and who can use the tools?

## 3. Materials and tools

- Silicone, fabric, vinyl, nylon, and thread.
- Silicone-based adhesive for bonding material layers.
- A 3D printer for making molds and test pieces.
- A sewing machine for joining fabric and assembling patterns.
- A pressure pump for inflation tests.
- My browser-based Panel & Assembly Studio for exploring geometry and cutting patterns.

## 4. Process and experiments

### 4.1 3D-printed molds

I started by exploring molds made with a 3D printer. The pieces below document this stage of the process.

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/printed-molds-and-test-pieces.jpg" alt="Colored branching pieces, square molds, and a circular segmented mold arranged on a table" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>3D-printed molds and test pieces from my experiments. Photo and work: Prapawit (Pam) Intun.</figcaption>
</figure>

### 4.2 Joining silicone and fabric

I explored several assembly techniques: sewing silicone elements together, stitching silicone to vinyl, bonding silicone-coated fabric with silicone-based adhesive, and combining stitching with silicone bonding.

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/silicone-thread-assembly.jpg" alt="A pale square silicone and fabric sample with a circular patterned area" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Silicone-and-thread assembly sample. Photo and work: Prapawit (Pam) Intun.</figcaption>
</figure>

#### Silicone elements joined by sewing

This test explores stitching as a way to connect silicone elements.

<div style="position:relative;width:100%;max-width:640px;aspect-ratio:240/272;margin:1rem auto;">
  <iframe src="https://player.vimeo.com/video/1245195830?dnt=1" title="Silicone elements joined by sewing" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture" allowfullscreen></iframe>
</div>

[Watch on Vimeo](https://vimeo.com/1245195830) · Video: Prapawit (Pam) Intun.

#### Silicone and vinyl joined with stitching

I also tested a stitched assembly combining silicone and vinyl.

<div style="position:relative;width:100%;max-width:640px;aspect-ratio:240/322;margin:1rem auto;">
  <iframe src="https://player.vimeo.com/video/1245197533?dnt=1" title="Silicone and vinyl joined with stitching" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture" allowfullscreen></iframe>
</div>

[Watch on Vimeo](https://vimeo.com/1245197533) · Video: Prapawit (Pam) Intun.

#### Silicone-coated fabric bonded with adhesive

Here I used a silicone-based adhesive to bond silicone-coated fabric.

<div style="position:relative;width:100%;max-width:640px;aspect-ratio:240/310;margin:1rem auto;">
  <iframe src="https://player.vimeo.com/video/1245195274?dnt=1" title="Silicone-coated fabric bonded with adhesive" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture" allowfullscreen></iframe>
</div>

[Watch on Vimeo](https://vimeo.com/1245195274) · Video: Prapawit (Pam) Intun.

#### Combining sewing and silicone bonding

This inflation test brings sewing and silicone bonding into the same assembly.

<div style="position:relative;width:100%;max-width:640px;aspect-ratio:240/306;margin:1rem auto;">
  <iframe src="https://player.vimeo.com/video/1245193830?dnt=1" title="Combining sewing and silicone bonding" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture" allowfullscreen></iframe>
</div>

[Watch on Vimeo](https://vimeo.com/1245193830) · Video: Prapawit (Pam) Intun.

### 4.3 Thickness, sealing, and inflation

The assembly worked, but my silicone was thicker than Porpla’s reference work. I needed more adhesive and a pressure pump. This made material thickness and the quality of the joins important questions for my next tests.

### 4.4 Drawing and sewing nylon patterns

For the nylon experiments, I drew the pattern myself and used sewing to assemble the forms. I enjoyed seeing how a drawing could become a physical object through stitching and inflation.

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/hand-drawn-nylon-pattern.jpg" alt="A hand-drawn curved outline on a sheet of white nylon fabric" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>My hand-drawn pattern on nylon before assembly. Photo and work: Prapawit (Pam) Intun.</figcaption>
</figure>
<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/sewing-nylon.jpg" alt="Sewing machine presser foot stitching white fabric beside a blue guide mark" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Stitching the nylon along the marked pattern. Photo and work: Prapawit (Pam) Intun.</figcaption>
</figure>
<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/nylon-inflatable-prototypes.jpg" alt="Two white sewn nylon prototypes, one rectangular with a projecting neck and one arch-shaped" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Sewn nylon prototypes prepared for inflation. Photo and work: Prapawit (Pam) Intun.</figcaption>
</figure>

## 5. Results: make it blow!

The video below documents my inflation experiment and the movement of the assembled material.

<div style="position:relative;width:100%;max-width:640px;aspect-ratio:424/240;margin:1rem auto;">
  <iframe src="https://player.vimeo.com/video/1245201864?dnt=1" title="Inflation experiment — sewn nylon prototypes" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="fullscreen;picture-in-picture" allowfullscreen></iframe>
</div>

[Watch on Vimeo](https://vimeo.com/1245201864) · Video: Prapawit (Pam) Intun.

These tests helped me compare sewing, adhesive bonding, and a combination of both. My next step is to better control thickness and sealing, then connect those material decisions to the digital design workflow.

## 6. Interactive web app

### 6.1 Pattern and assembly studio

This browser-based prototype connects my digital geometry work to textile fabrication. It loads my supplied model and can import OBJ, STL, or 3DM files, prepare numbered panels with seam allowances, and export DXF cutting layouts and CSV lists. The assembly view helps identify matching panel edges.

Try changing the panel resolution or dimensions, generating a cut layout, and selecting a panel to inspect its matching seams. For a wider workspace, open the app in a new tab.

[Open the interactive studio](https://prapawitintun.github.io/text-to-inflation/) · [View the GitHub repository](https://github.com/prapawitintun/text-to-inflation) · [Download the standalone HTML](https://raw.githubusercontent.com/prapawitintun/text-to-inflation/main/AAG_Textile_Studio_2026.html)

<div style="width:100%;margin:1.5rem 0;">
  <iframe src="https://prapawitintun.github.io/text-to-inflation/studio.html" title="Air / Script — pattern assembly and preliminary structural study by Prapawit Intun" loading="lazy" style="width:100%;height:960px;border:1px solid #d5ddd5;border-radius:10px;" allow="fullscreen" allowfullscreen></iframe>
</div>

The studio has two connected modes: **Pattern & assembly** and **Structural study**. Structural study now uses my supplied AAG mesh, including the current scale and geometry from the pattern editor. It calculates a preliminary nonlinear elastic membrane response to pressure. Text-driven generation and physical inflation control remain future research directions.

### 6.2 From a mesh to structural behavior

The engineering slide I photographed during the Pneuhaus lecture connects geometric modeling with an analysis visualization. The left image shows a discretized form; the right shows a colored numerical visualization. The photograph does not provide a readable result legend, units, material parameters, or load case, so I cannot identify its plotted quantity or infer structural capacity from its colors.

<figure>
  <img src="https://prapawitintun.github.io/text-to-inflation/images/week08/pneuhaus-engineering-analysis.jpg" alt="Pneuhaus lecture engineering slide with a meshed inflatable form on the left and a colored analysis visualization on the right" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
  <figcaption>Engineering slide from Pneuhaus’s “Building with Air” lecture at Harvard GSD. Photo: Prapawit (Pam) Intun; slide and work shown: Pneuhaus. This is a research reference, not an analysis result for my prototypes.</figcaption>
</figure>

For my work, the question is how internal pressure, fabric direction, thickness, seams, and supports together determine the inflated form and its response to loading. A cutting mesh gives me geometry and assembly information; a structural model also needs material behavior, loads, and boundary conditions.

### 6.3 Interactive structural study on my model

Select **Structural study** in the app above, or [open the model analysis directly](https://prapawitintun.github.io/text-to-inflation/studio.html#structure). My supplied AAG model loads automatically. The integrated studio transfers the current pattern mesh and its dimensions, so changes made in **Pattern & assembly** can be studied on the same geometry. A **Use current pattern model** button requests a fresh transfer.

The view now shows my actual triangulated geometry. Green dots identify vertices fixed in X, Y, and Z. The initial support assumption clamps the lowest 5% of the model’s Z range; I can change the band or click triangles in support-editing mode. Those supports need to match the real experiment before I interpret the results physically.

The solver applies pressure to the oriented closed mesh and minimizes membrane strain energy minus pressure times enclosed volume. It uses geometrically nonlinear triangular elements and an illustrative isotropic plane-stress St Venant–Kirchhoff material. The optional tension-field relaxation removes compressive membrane stress in slack/wrinkled directions without resolving individual wrinkle shapes. Background references: [constant-strain triangles, University of Alberta](https://engcourses-uofa.ca/finite-element-analysis/two-dimensional-solid-elements/), and [Pipkin’s relaxed membrane energy (1986)](https://academic.oup.com/imamat/article-abstract/36/1/85/762621).

After a converged solve, I can inspect:

- Maximum and minimum principal membrane force in N/mm, colored across the mesh.
- Displacement in mm and a separate visual deformation magnification.
- Maximum Green strain in percent.
- Individual F-numbered triangles and their computed values.
- The force residual, solver iterations, fixed vertices, and a downloadable JSON report.

The starting **0.2 kPa pressure, 0.3 mm reference thickness, 100 MPa elastic modulus, and 0.3 Poisson ratio are example inputs**, not measured properties of my prototypes. The default dimensions match the pattern studio’s initial 2,500 × 2,500 × 2,300 mm Fit XYZ settings; transferring my current pattern model uses its current dimensions instead.

This analysis treats the supplied three-dimensional mesh as an unstressed reference surface. It does not simulate assembly from flat sewn panels. It also omits woven-fabric anisotropy, seam slip and failure, self-contact, and calibrated silicone behavior. Numerical convergence establishes equilibrium for the stated assumed model; it does not validate the physical object or its load-bearing capacity. Non-converged runs withhold the displacement and force maps. Support and mesh refinement studies are still needed, especially before interpreting local peak values.

I can also open the [separate ideal-cylinder/sphere calculator](https://prapawitintun.github.io/text-to-inflation/structure-analysis.html) to compare simple pressure–radius–thickness relationships with an analytical reference.

### 6.4 What I need for a full analysis of my inflatable

A full model would need the following evidence and setup:

| Part of the model | What I would measure or define |
| --- | --- |
| Geometry | Flat cutting patterns, inflated dimensions, fabric orientation, ports, and reinforcement. |
| Material | Warp/weft tensile response and shear for woven fabric; a calibrated stretch model for silicone, including thickness changes. |
| Connections | Actual stitched or bonded seam construction, strip-test behavior, and any slip or separation. |
| Loads and restraints | Gauge pressure, self-weight, external loading, and how the specimen is supported or anchored. |
| Solution and checks | Nonlinear pressurization, large deformation, mesh refinement, and convergence before interpreting stress or displacement. |
| Validation | Compare predicted shapes and force levels with measured pressure–shape tests and seam behavior. |

NASA’s [Smalley, Tinker, and Saxon study (2002)](https://ntrs.nasa.gov/citations/20030014812) describes nonlinear pressurization before subsequent modal analysis, capturing the stiffening effect of pressure and checking predictions against an inflated-cylinder experiment. It is a useful methodological reference for moving beyond a static geometric preview.

### 6.5 Toward a feedback loop for text-to-inflation

My proposed workflow is: **describe an intention → generate a candidate form → prepare panels → evaluate material and structural behavior → revise → fabricate and test**. Speech to Reality provides a precedent for checking fabrication constraints between a prompt and assembly. MechStyle provides a precedent for feeding mechanical results back into generation. My next research step is to adapt those ideas to pressurized textiles and verify them with physical samples.


## 7. Reflection and next steps

Sewing was one of the most exciting parts of this week. It gave me a direct way to work with a pattern and see it become a volume. The silicone experiments also showed me that thickness and assembly details can change what is needed to make a piece inflate.

My main challenge is to focus my investigation. I have a clearer idea of what I want to understand: how a design intention can move through digital geometry, a fabrication pattern, material assembly, and inflation. I would like to carry this question into my final project.

For the next experiments, I want to compare more controlled samples, improve sealing, and test the relationship between the drawn pattern and the inflated shape.

## 8. Files, references, and credits

- [Interactive studio and source repository](https://github.com/prapawitintun/text-to-inflation).
- Kyaw, Smith, Jeon, and Gershenfeld (2025), [Speech to Reality](https://doi.org/10.1145/3745778.3766670), ACM SCF; [project and demonstration](https://alexanderhtetkyaw.com/speech-to-reality/).
- Faruqi et al., including Gershenfeld (2025), [MechStyle](https://hcie.csail.mit.edu/research/mechstyle/mechstyle.html), ACM SCF; paper and demonstration linked on the research page.
- Kyaw, Jeon, Smith, and Gershenfeld (2025), [Making Physical Objects with Generative AI and Robotic Assembly](https://arxiv.org/abs/2504.19131), workshop paper.
- University of Alberta, [Two Dimensional Solid Elements](https://engcourses-uofa.ca/finite-element-analysis/two-dimensional-solid-elements/), triangular finite element formulation.
- Pipkin (1986), [The Relaxed Energy Density for Isotropic Elastic Membranes](https://academic.oup.com/imamat/article-abstract/36/1/85/762621), tension-field methodology.
- University of Illinois, [Introductory Solid Mechanics: Pressure Vessels](https://mechref.engr.illinois.edu/sol/pressure.html), analytical membrane equations.
- Smalley, Tinker, and Saxon (2002), [Nonlinear Pressurization and Modal Analysis Procedure for Dynamic Modeling of Inflatable Structures](https://ntrs.nasa.gov/citations/20030014812), NASA NTRS.

- [Standalone app HTML](https://raw.githubusercontent.com/prapawitintun/text-to-inflation/main/AAG_Textile_Studio_2026.html), including the app’s embedded source-file downloads.
- [Porpla’s soft robotics documentation](https://class.textile-academy.org/2026/pattaraporn-kittisapkajon/assignments/week08/).
- Pneuhaus, “Building with Air,” lecture attended at Harvard Graduate School of Design; photographs above document the presentation and work shown.
- All five embedded experiment videos: Prapawit (Pam) Intun, hosted on Vimeo.
- Process photographs and prototypes: Prapawit (Pam) Intun, except the credited Porpla reference and Pneuhaus work shown in the lecture photographs.

### Special thanks

Thank you to Anastasia for understanding my situation and giving me opportunities to learn; to Sherry, Chelsea, and Jack for providing space, suggestions, and support; and to Kate for sharing her sewing-machine expertise.

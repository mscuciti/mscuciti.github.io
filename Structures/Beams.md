---
title: Structural Analysis by hand using Singularity Equations in Matrix Form
layout: myPost
---

# Structures

I am a licensed Civil Engineer in U.S.A. Nothing on this or subsequent pages should be construed as professional practice. 

This content is for education and informational purposes only, and no warantee of its accuracy is implied by this publication.

## The Beam Equation 

I have been interested in the beam equation: `Deflection (x) = d^2 / dx^2 (Stiffness)^-1 d^2 / dx^2 Load (x)` [Eq 1]

Which is really more properly: 

```
Deflection (x)
= d/dx Slope (x)
= d^2/dx^2 (Stiffness)^-1 Moment (x)
= d^2/dx^2 (Stiffness)^-1 d/dx Shear (x)
= d^2/dx^2 (Stiffness)^-1 d^2/dx^2 Load (x)
```
[Eq 2]

Usually called the integration method.

This formulation appeals to me for a couple of reasons:

We have a tendency in university to do all sorts of techniques to reduce the degree of indeterminancy (Virtual Work, Superposition, Etc.)  
These are all fine as it goes, however: in practice i have found it is sometimes desirable to have a very simple direct method. 

Some advantages: 
 - The method is the same every time
 - The method is accessible to hand calcs (simply have a computer provide the solution to the linear system, OR use cramers rule)

Some disadvantages:
 - While i can verify if the method was performed correctly, errors in the way the mothod is set up aren't easily found
   - I usually verify one iteration of this with a structural analysis program anyway, and there's usually one or two mistakes.
 - This method is not something your coworkers will probably want to learn, so it's a solo if you decide to use it.

In other words, rather than just saying "analysis is the machine's job". 
We can set up our variables by hand and let the computer handle the very last step.
Then, we can quickly verify the results, which i like to do 
(even though the solution of a linear system via lsolve has never been wrong, as far as i can tell).

So far, so elementary. What i'd like to share is my particular organization of this method, and how i like to apply it.

## External Equilibrium

Equilibrium has a couple of definitions in structural theory. I'd like to describe the following phenomenon:

**The state of a structure such that it has forces acting on it, which are balanced by reaction forces, such that the structure as a whole does not accelerate**

Not the most rigorous definition, but it'll do. Let's try making it a little more specific:

`Sum (Load Effects + Integration Constant Effects + Reaction Force Effects) = Statical Bounds` [Eq 3]


Those familiar with the technique of the integration method will recognize some terms here.
 - Statical Bounds are those conditions which are inherent to how the structure is described.
   - For example: a support has deflection = 0.
 - Integration constants allow for initial conditions of the beam equation to be defined. 
   - Looking at Eq 2 up there, it's easy to see why this term is necessary
   - Albeit, only for M(x), s(x), and D(x).
 - Loading and support effects probably won't suprise you, but perhaps the term "effect" does.
  - Here, i am choosing to define "effect" as meaning any of the terms in Eq 2 besides stiffness.
  - Which is to say: the shear effect, moment effect, slope effect and deflection effect.
  - I am NOT using it in the way say, LRFD might use it, which is a pretty broad application of the term where it could mean things like strain, etc.

Crucial to our understanding of how to solve Eq 3 (generally for Reaction force effects) 
we will have to recognize that each of these terms is the product of a constant and a polynomial of x.
I have **bolded** the unknowns in Eq 4 below.
Also, I like to think of the Integration Constant as another kind of bound. One which we solve for. So, call it "Initial Bound" from now on.

```
**Reaction Effect Coeff** * Reaction Effect Poly
+ **Init Bound Coeff** * Init Bound Poly
=
Statical Bound Coeff * Statical Bound Poly
- Load Effect Coeff * Load Effect Poly
```

[Eq 4]

We're getting somewhere. So, what is this polynomial term?

## Singularity Functions

When i was at university, i became intrigued by these little functions. Later, i became intrigued by their (part) creator: Oliver Heaviside.
Look him up when you get a chance, he's an interesting guy.

In this work, they are half of every term in the beam equation. Representing how loads, reactions and initial conditions propogate along a euler beam.

usually of the form:

`<x - a>^n`

I like to write them in the form:

`S_a^n`

Which is the form they will take throughout the rest of this essay. You can write them however you wish.

These are for a unit load / shear force / moment couple / etc. They are most useful when paired with a constant term:

`C_i * S_a^n`

Which is our "Coeff" and "Poly" above.

## Matrix Representation

I find linear combinations are easier to understand in their matrix form. So, for example, in Eq 4, we can write the Load Effect:

```
[ Load 1 (kip)  Load 2 (kip)  Load 3 (klf)]     v---------- Boundary Condition under consideration (typ)
__________________________________________
| S_B^1         S_D^1         S_E^2       | <== Moment Effect
| S_B^1         S_D^1         S_E^2       | <== Moment Effect
| S_B^3         S_D^3         S_E^4       | <== Deflection Effect
```


Here, to avoid always having to change the exponent for distributed loads, I like to define a "patch" load function.

`w_(a,b)^n = S_a^(n+1) - S_b^(n+1)` [Eq 5]

So the above becomes:

```
[ Load 1 (kip)  Load 2 (kip)  Load 3 (klf)]
  @ B           @ D           @ E to F
=
[ P_1           P_2           ω_3         ]
__________________________________________
| S_B^1         S_D^1         w_(E,F)^1   | <== Moment Effect
| S_B^1         S_D^1         w_(E,F)^1   | <== Moment Effect
| S_B^3         S_D^3         w_(E,F)^3   | <== Deflection Effect
```

We can similarly define the other terms in Eq 4.

### Init Bound:

initial bound is a bit tricky, because we do not have these constants in some of our equations.

For instance, it doesn't really make sense to talk about the "slope constant" when considering moment effect.

To deal with such cases, we include a test in the poly matrix.

```
[ M0             θEI0               ΔEI0               ]
________________________________________________________
| (0>=0)*S_0^0   (0>=1)*S_0^(-1)    (0>=2)*S_0^(-2)    | <== Moment Effect
| (0>=0)*S_0^0   (0>=1)*S_0^(-1)    (0>=2)*S_0^(-2)    | <== Moment Effect
| (2>=0)*S_0^2   (2>=1)*S_0^1       (2>=2)*S_0^0       | <== Deflection Effect
```

Don't worry if these are known to be zero. It's fine to keep them as unknowns, and just solve with extra equations. Unless you're doing this by hand. 
If that's the case, you can feel free to get rid of them to reduce the number of equations (and reduce the size of the determinants).

### Reactions:

Nothing special here, reactions are treated the same as loads (because... they are the same).

The only difference is that while the poly matrix is known, the constants are not (in fact, this is largely what we're solving for).

```
[ R_A          R_B            R_C         ]
__________________________________________
| S_A^1        S_B^1          S_C^1       | <== Moment Effect
| S_A^1        S_B^1          S_C^1       | <== Moment Effect
| S_A^3        S_B^3          S_C^3       | <== Deflection Effect
```

Statical Bound:

```
    | M_A = 0 |
Q = | M_C = 0 |
    | Δ_C = 0 |
```

Usually for simple beams these bounds will be zero, but could be set to other variables if, for example, 
the beam frames into another member thru a moment connection, or there is differential settlement or something.

Now we are ready to combine all of the above into one equation of the form:  `A * u = B * v`   



```
| u : [ R_A        R_B        R_C       |  M0            θEI0               ΔEI0              ] | = | v:  [ 1        |   -P_1       -P_2      -ω_3        ] |
|     ----------------------------------------------------------------------------------------- |   |     ------------------------------------------------- |
|     | S_A^1      S_B^1      S_C^1     | (0>=0)*S_0^0   (0>=1)*S_0^(-1)    (0>=2)*S_0^(-2)   | |   |     | M_A = 0  |   S_B^1      S_D^1     w_(E,F)^1   | |
| A : | S_A^1      S_B^1      S_C^1     | (0>=0)*S_0^0   (0>=1)*S_0^(-1)    (0>=2)*S_0^(-2)   | | = | B:  | M_C = 0  |   S_B^1      S_D^1     w_(E,F)^1   | |
|     | S_A^3      S_B^3      S_C^3     | (2>=0)*S_0^2   (2>=1)*S_0^1       (2>=2)*S_0^0      | |   |     | Δ_C = 0  |   S_B^3      S_D^3     w_(E,F)^3   | |
```

You may notice from this that the exponent is defined by the boundary conditions. Typically 0 for shear, 1 for moment, etc. With the exception of the init matrix. 

I've gottem in the habit of not even writing the exponent for this reason. I simply add a column "j" denoting the degree of the boundary condition.

Similarly, the init matrix never changes, and is defined by the degree of the boundary condition for a given row. Typically, for degree "j":

```
    | (j > 0) * S_0 ^ (j - 1) | (j > 1) * S_0 ^ (j - 2) | (j > 2) * S_0 ^ (j - 3) |
C = | (j > 0) * S_0 ^ (j - 1) | (j > 1) * S_0 ^ (j - 2) | (j > 2) * S_0 ^ (j - 3) |
    | (j > 0) * S_0 ^ (j - 1) | (j > 1) * S_0 ^ (j - 2) | (j > 2) * S_0 ^ (j - 3) |
```

So, our revised table looks fairly neat:

```
| u : [ R_A      R_B      R_C     |  M0  θEI0  ΔEI0  ] | = | v:  [ 1        |   -P_1     -P_2    -ω_3      ] |  j  |
|     ------------------------------------------------ |   |     ------------------------------------------- |-----|
|     | S_A      S_B      S_C     |                  | |   |     | M_A = 0  |   S_B      S_D     w_(E,F)   | |  1  |
| A : | S_A      S_B      S_C     |         C        | | = | B:  | M_C = 0  |   S_B      S_D     w_(E,F)   | |  1  |
|     | S_A      S_B      S_C     |                  | |   |     | Δ_C = 0  |   S_B      S_D     w_(E,F)   | |  3  |
```


























# Source Audit

The supplied web build was inspected locally to understand its systems before rebuilding them from scratch.

## Embedded resources found

The export contains 45 embedded resources:

- 13 text/data resources covering achievements, charities, colleges, names, player records, schedules, shopping, teams, and uniforms
- 4 image resources (three texture atlases plus splash art)
- 20 OGG sound resources for crowd, UI, tackles, throws, kicking and other effects
- 1 platform integration JavaScript resource
- compiled GameMaker runtime/game code in the HTML

The English language table contains 1,173 keyed strings. Major groups include 399 UI strings, 177 message strings, 61 commentary strings, 47 information/help strings, 44 match strings, 36 dilemma strings, 36 traits, 35 news strings, 32 tips, 24 post-match strings, 17 training strings, 15 position strings, and 14 player-attribute strings.

## Systems identified and used as design requirements

- Career and season flow
- Standings, playoffs/championship progression
- Player roster, positions, ratings, morale, condition, contracts and age
- Draft, free agents, trades and cuts
- Coaching staff and coordinator ratings
- Stadium/training/rehab facilities
- Coaching credits/economy
- Player XP, levels and attribute growth
- Team offense/defense ratings
- Passing, running, kicking, field goals, punts, turnovers and scoring
- Training/practice modes
- Dilemmas/news/events
- Achievements and player records
- Custom uniforms

## Clean-room rule

The 3D rewrite uses the original export only as a behavioral reference. Original binary assets, databases, branding and compiled code are deliberately excluded from the repository.

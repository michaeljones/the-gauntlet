
There is a computer game called Ravenswatch. It currently has 12 characters. It has 4 levels of difficulty. The hardest
level is called Nightmare. There are then 'modifiers' which can be applied to make the game easier or harder. Positive
modifiers make the game easier and negative modifiers make the game harder.

The Youtuber called Postive4ce is trying to complete a challenge he calls 'The Gauntlet' where he has to complete the
game on Nightmare with 5 randomly selected negative modifiers for each character in order. If the he loses, he moves
on to the next character but his win streak is reset. He wins the Gauntlet if he wins with all 12 characters in a row
starting at any character.

The negative modifiers are selected exhaustively. There are 11 negative modifiers in total. In the first run he selects
5 at random, in the second run, he leaves those five out of the pool and selects 5 more, in the third run he selects
the last one and puts everything else back in the pool and selects another 4 and so on.

The names of the 11 negative modifiers in order are:

- Dried up fountains
- Inflation
- Lack of inspiration
- Bloodlust
- Corruption
- Disease
- Invigorating death
- Angry birds
- Shadowy fog
- Oppresive nightmare
- Beserker foes

The characters in order are:

- Scarlet
- Pied Piper
- Beowulf
- The Snow Queen
- Aladdin
- Melusine
- Gepetto
- Sun Wukong
- Carmilla
- Romeo
- Juliet
- Merlin
 
I would like to create a client side web app that records the YouTuber's progress in the gaunlet with wins and loses and
the characters played and what negative modifiers applied to which run. I would also like it to be able to randomly
select the modifiers for the next run using the logic described.

The Gaunlet happens slowly with a run every few days so we can have the web app just run with a yaml or json data store
but it would be good to have the ability to generate multiple new runs using client side data storage (like local storage)
so that the YouTuber can progress through multiple runs without having to update the main hardcoded data store. But
it doesn't have to have a full database behind it.

The UI can just be a list of runs in reverse chronologic order with some kind of 'next run' button at the top which will
automatically select the next character and choose the 5 negative modifiers. It would also be good for it to show the
current win streak and the longest historical win streak and total number of loses.

I'll aim to host the web app on github pages initially. I don't mind what technology is used but I'd prefer Typescript
to Javascript and then it should use whatever technology makes the project the most approachable for others to contribute to it.

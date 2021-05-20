/**
 * What Am I actually building here?
 * 1. An experience, 
 * 2. Fucking spaceship. Rather complex system, that solves a bunch of problems at once
 *  Key features:
 *      Zero trust, distributed, user owned data. 
 *      Runs on user's backends, and there are hubs (third party servers).
 *      Custom(izable) client (is built from config, provided by user, or they might bring their own).
 *      Secretly, is a game.
 *      Learns, as a system.  
 *      Simple ML capabilities to back it up
 *      ML: is a white box, no matter how slow it is 
 *      (multiple backends per user is a go-to solution. colab is free :-) + users are rather loaded with compute as well
 *      Problem aggregator: common problems are to be delegated to dedicated solvers that are proven to do that better
 * 
 * 
 */

/**
 * Problems to solve:
 * Education. Learning, actually. Planning a character, tracking skills and progress.
 * Motivation. Instant gratification setup + 
 * Entertainment. Making the life actually worth it to play. 
 * (Self)Organization, that allows for people to do, plan, distribute things efficiently, 
 * without relying on money.
 * 
 * 
 */

/**
 * How it works?
 * Features are added via discovering them via trusted sources (worst case - user input only).
 * In case of browser clients, communication is being done via postMessage API, modules are added as iframes. 
 * Users are represented with their key pairs (Inner logic and hubs)
 * or other associated data (later). Proven, to belong to them. Maybe with some level of confidence.
 * Example: Hub 1 knows that pubkeyA belongs to Alice and can prove it (by having Alice's ID scan, signed by her key or something)
 *  
 * 
 */
/** Technical challenges to overcome:
 *  -  webkit not working with Cache API
 *  (Possible solutions are:
 *  just store markup in localStorage and load it from there (Joke?)
 *  Using dedicated clients for IOS
 *  Suicide swap markup with whataver client's text - CURRENT)
 *  or maybe it does work with some wicked workaround... later.
 *  
 */
/** USER SCENARIOS
 * 1. Todo-list: 
 * you add stuff you want to be done, then add a solution (how). Or discover already existing.
 * Task gets split into the sequence, variables get discovered, Each solution (or sub-solution?)
 * consists of actions and a context. Logs are stored then analyzed to make predictions.
 * This way, "turn the lights off" task can be solved either by accessing the smart switch (if ever),
 * OR by assigning a quest to the user themselves or one of their slaves (friends? relatives? )
 * 
 * Actions from the list might be executed automatically, conditionally or otherwise. With the confirmation
 * or not, depending on the status. Or triggered manually.
 * If no solution available, there's a quest (started?) to discover one.
 * 
 * This to-do list actually forms so called user's utility function (in terms of AI engineerig)
 * One of the goals would be to find the common points and leverage existing solutions from the other agents,
 * third party or other users
 * 
 * 
 * 2. UI. Same algorithm can be reused here, to form the experience. Basically, client is yet another agent
 * with their problems. Example: Show something on map. If there's no map module exist, client gets assigned 
 * a quest to discover one. Storing solutions used with some sort of a feedback from user, defining whether 
 * they will ever be used again, should be improved or not.
 * Depending on the user's preferences, client's core might be swapped... see #architecture
 * 
 * 3. Productivity
 */

/** ML part:
 * 
 * 
 * 
 */

/** Architecture:
 * As already mentioned, there's a core and modules. Modules are just a solutions, facing
 * one or another problem. Like, displaying, creating, managing the stuff (user interaction) or
 * Interacting with other agents, databases, any software, all that.
 * 
 * Crucial part is the interface, other than that, anything would do.
 * Clients May vary from embeds to mixed reality ones.  
 * 
 * For web version, modules might come in the form of iframe, with data being fed directly
 *  from trusted(? relatively, there are policies, trust levels 
 * (those are used to stop propagating message events, some parts of those, once threshold is reached.(?) not sure about this part.) )
 */

/** Game features:
 * 1. Skills. -Known information about user's capabilities. 
 *  Coupled with certification system can be used for prooving skills. (CV?).
 *  Used for character development planning, like, closest skills, that are easy to acquire from this point,
 * that give you an optimal result (job, in some cases, )..
 * Activity labeling and suggestion, depending on the training plan. (and status)
 * 
 * 2. Quests. Difference between wanted state of some specific context and the actual one, turned into specific 
 * form and coupled with human readable information about the task.
 * Machine part includes context: Vars to check, sources of truth for those. Their required end state.
 * 
 * Human interface for creating those might include blockly, trained AI agent, plain JSON/LMAY text file, 
 * form for generating those. 
 * 
 * 3. Mini-map - navigation module, default one is leaflet with tiles 
 * (those might be swapped or fed from different source).
 * as mentioned, modules can be swapped 
 * (common interface for maps still include XYZ coordinates - Lat Long Alt for outdoors - gps or something else for indoor (XR only?))
 * 4. Guilds. Task specific entities, specializing each on their own area. Public utility function is related to it.
 * 5. Clans. - Tags, access management, all that. Yet another group agent, but, unlike parties, it's permanent. 
 * Might act similar to players, as in, Assign quests, share data, 
 * 6. Parties - Trusted (with some specific data) group users that exchange streaming data with each other.
 * 7. HUD - Here, I actually mean health bars and likes. Aggregated, processed sensors data fed to widgets. Same modules from before.
 *  HUD data might be used for time, energy and other resource management, recommending you an activity, 
 * based on your (predicted/measured) state and goals.
 * 8. Standings - trust level, 
 */
/** Reasoning: (WIP)
 * Attention: observing global variables (context) by logging their state
 * Learning: if 
 * Action: context. check affected variables, 
 * Is a: if it is known, that A is a B and C (somehow, with some relation)
 * we might check it by 
 * Confidence 1: There are rules, that just work;
 * such actions are being simplified to ..
 * rule's conidence by default is inherited from it's source.
 * Might be changed later by learning, checking, prooving 
 * 
 * Experimental:
 * Sleeping - normalizing all the (priorities?).
 * task might be given the higher priority by
 * Empathy:
 * Trying to apply known solutions with your/other's context and mixing in your state
 * (Utilizing declared utility functions ) 
 * 
 * AND we need this all for? :
 * 
 * 
 */

/**
 * Player and the system are empathetic towards each other, and the system keeps an eye on both:
 * Tracks their state and goals
 * Empathy here means considering other's interersts
 */

//#region 


//#endregion
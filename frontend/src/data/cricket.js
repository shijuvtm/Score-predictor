import { TEAM_META } from "../constants/teams.js";

const stadium = "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=85";
const cricketAction = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80";
const cricketGround = "https://images.unsplash.com/photo-1593766827228-8737b5cd8f4b?auto=format&fit=crop&w=1000&q=80";

export const teams = Object.entries(TEAM_META).map(([name, meta], index) => ({
  id: `team-${index + 1}`,
  name,
  short: meta.short,
  color: meta.color,
  country: "India",
  players: index === 0 ? 25 : 24,
  description: `${name} bring a distinctive identity and a passionate following to the Indian Premier League. Explore the squad, team profile and season information.`,
}));

export const matches = [

  
  // IPL 2026 — Opening matches
  {
    id: "ipl26-001", status: "Completed", format: "T20",
    date: "28 Mar 2026", time: "7:30 PM",
    venue: "M. Chinnaswamy Stadium", city: "Bengaluru",
    home: "Sunrisers Hyderabad", away: "Royal Challengers Bengaluru",
    homeScore: "201/9", homeOvers: "20",
    awayScore: "203/4", awayOvers: "15.4",
    note: "RCB won by 6 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-002", status: "Completed", format: "T20",
    date: "29 Mar 2026", time: "7:30 PM",
    venue: "Wankhede Stadium", city: "Mumbai",
    home: "Kolkata Knight Riders", away: "Mumbai Indians",
    homeScore: "220/4", homeOvers: "20",
    awayScore: "224/4", awayOvers: "19.1",
    note: "Mumbai Indians won by 6 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-003", status: "Completed", format: "T20",
    date: "30 Mar 2026", time: "7:30 PM",
    venue: "Barsapara Cricket Stadium", city: "Guwahati",
    home: "Chennai Super Kings", away: "Rajasthan Royals",
    homeScore: "127", homeOvers: "19.4",
    awayScore: "128/2", awayOvers: "12.1",
    note: "Rajasthan Royals won by 8 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-004", status: "Completed", format: "T20",
    date: "31 Mar 2026", time: "7:30 PM",
    venue: "PCA International Cricket Stadium", city: "New Chandigarh",
    home: "Gujarat Titans", away: "Punjab Kings",
    homeScore: "162/6", homeOvers: "20",
    awayScore: "165/7", awayOvers: "19.1",
    note: "Punjab Kings won by 3 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-005", status: "Completed", format: "T20",
    date: "01 Apr 2026", time: "7:30 PM",
    venue: "Ekana Cricket Stadium", city: "Lucknow",
    home: "Lucknow Super Giants", away: "Delhi Capitals",
    homeScore: "141", homeOvers: "18.4",
    awayScore: "145/4", awayOvers: "17.1",
    note: "Delhi Capitals won by 6 wickets",
    season: 2026, competition: "IPL"
  },

  // IPL 2026 — Middle matches
  {
    id: "ipl26-006", status: "Completed", format: "T20",
    date: "28 Apr 2026", time: "7:30 PM",
    venue: "PCA International Cricket Stadium", city: "New Chandigarh",
    home: "Punjab Kings", away: "Rajasthan Royals",
    homeScore: "222/4", homeOvers: "20",
    awayScore: "228/4", awayOvers: "19.2",
    note: "Rajasthan Royals won by 6 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-007", status: "Completed", format: "T20",
    date: "29 Apr 2026", time: "7:30 PM",
    venue: "Wankhede Stadium", city: "Mumbai",
    home: "Mumbai Indians", away: "Sunrisers Hyderabad",
    homeScore: "243/5", homeOvers: "20",
    awayScore: "249/4", awayOvers: "18.4",
    note: "Sunrisers Hyderabad won by 6 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-008", status: "Completed", format: "T20",
    date: "30 Apr 2026", time: "7:30 PM",
    venue: "Narendra Modi Stadium", city: "Ahmedabad",
    home: "Royal Challengers Bengaluru", away: "Gujarat Titans",
    homeScore: "155", homeOvers: "19.2",
    awayScore: "158/6", awayOvers: "15.5",
    note: "Gujarat Titans won by 4 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-009", status: "Completed", format: "T20",
    date: "01 May 2026", time: "7:30 PM",
    venue: "Sawai Mansingh Stadium", city: "Jaipur",
    home: "Rajasthan Royals", away: "Delhi Capitals",
    homeScore: "225/6", homeOvers: "20",
    awayScore: "226/3", awayOvers: "19.1",
    note: "Delhi Capitals won by 7 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-010", status: "Completed", format: "T20",
    date: "02 May 2026", time: "7:30 PM",
    venue: "M. A. Chidambaram Stadium", city: "Chennai",
    home: "Mumbai Indians", away: "Chennai Super Kings",
    homeScore: "159/7", homeOvers: "20",
    awayScore: "160/2", awayOvers: "18.1",
    note: "Chennai Super Kings won by 8 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-011", status: "Completed", format: "T20",
    date: "03 May 2026", time: "3:30 PM",
    venue: "Rajiv Gandhi International Stadium", city: "Hyderabad",
    home: "Sunrisers Hyderabad", away: "Kolkata Knight Riders",
    homeScore: "165", homeOvers: "19",
    awayScore: "169/3", awayOvers: "18.2",
    note: "Kolkata Knight Riders won by 7 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-012", status: "Completed", format: "T20",
    date: "03 May 2026", time: "7:30 PM",
    venue: "Narendra Modi Stadium", city: "Ahmedabad",
    home: "Punjab Kings", away: "Gujarat Titans",
    homeScore: "163/9", homeOvers: "20",
    awayScore: "167/6", awayOvers: "19.5",
    note: "Gujarat Titans won by 4 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-013", status: "Completed", format: "T20",
    date: "04 May 2026", time: "7:30 PM",
    venue: "Wankhede Stadium", city: "Mumbai",
    home: "Lucknow Super Giants", away: "Mumbai Indians",
    homeScore: "228/5", homeOvers: "20",
    awayScore: "229/4", awayOvers: "18.4",
    note: "Mumbai Indians won by 6 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-014", status: "Completed", format: "T20",
    date: "05 May 2026", time: "7:30 PM",
    venue: "Arun Jaitley Stadium", city: "Delhi",
    home: "Delhi Capitals", away: "Chennai Super Kings",
    homeScore: "155/7", homeOvers: "20",
    awayScore: "159/2", awayOvers: "17.3",
    note: "Chennai Super Kings won by 8 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-015", status: "Completed", format: "T20",
    date: "06 May 2026", time: "7:30 PM",
    venue: "Rajiv Gandhi International Stadium", city: "Hyderabad",
    home: "Sunrisers Hyderabad", away: "Punjab Kings",
    homeScore: "235/4", homeOvers: "20",
    awayScore: "202/7", awayOvers: "20",
    note: "Sunrisers Hyderabad won by 33 runs",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-016", status: "Completed", format: "T20",
    date: "07 May 2026", time: "7:30 PM",
    venue: "Ekana Cricket Stadium", city: "Lucknow",
    home: "Lucknow Super Giants", away: "Royal Challengers Bengaluru",
    homeScore: "209/3", homeOvers: "19",
    awayScore: "203/6", awayOvers: "19",
    note: "Lucknow Super Giants won by 9 runs (DLS)",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-017", status: "Completed", format: "T20",
    date: "08 May 2026", time: "7:30 PM",
    venue: "Arun Jaitley Stadium", city: "Delhi",
    home: "Delhi Capitals", away: "Kolkata Knight Riders",
    homeScore: "142/8", homeOvers: "20",
    awayScore: "147/2", awayOvers: "14.2",
    note: "Kolkata Knight Riders won by 8 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-018", status: "Completed", format: "T20",
    date: "09 May 2026", time: "7:30 PM",
    venue: "Sawai Mansingh Stadium", city: "Jaipur",
    home: "Gujarat Titans", away: "Rajasthan Royals",
    homeScore: "229/4", homeOvers: "20",
    awayScore: "152", awayOvers: "16.3",
    note: "Gujarat Titans won by 77 runs",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-019", status: "Completed", format: "T20",
    date: "10 May 2026", time: "3:30 PM",
    venue: "M. A. Chidambaram Stadium", city: "Chennai",
    home: "Lucknow Super Giants", away: "Chennai Super Kings",
    homeScore: "203/8", homeOvers: "20",
    awayScore: "208/5", awayOvers: "19.2",
    note: "Chennai Super Kings won by 5 wickets",
    season: 2026, competition: "IPL"
  },
  {
    id: "ipl26-020", status: "Completed", format: "T20",
    date: "10 May 2026", time: "7:30 PM",
    venue: "Shaheed Veer Narayan Singh Stadium", city: "Raipur",
    home: "Mumbai Indians", away: "Royal Challengers Bengaluru",
    homeScore: "166/7", homeOvers: "20",
    awayScore: "167/8", awayOvers: "20",
    note: "Royal Challengers Bengaluru won by 2 wickets",
    season: 2026, competition: "IPL"
  }, 
  // INDIA vs NEW ZEALAND — 2026 T20I SERIES
  {
    id: "match-01", status: "Completed", format: "T20",
    date: "01 Nov 2026", time: "TBD",
    venue: "Seddon Park", city: "Hamilton",
    home: "New Zealand", away: "India",
    homeScore: "195/3", homeOvers: "18",
    awayScore: "191/8", awayOvers: "20",
    note: "New Zealand won by 7 wickets"
  },
  {
    id: "match-02", status: "Completed", format: "T20",
    date: "30 Oct 2026", time: "TBD",
    venue: "Eden Park", city: "Auckland",
    home: "New Zealand", away: "India",
    homeScore: "259/7", homeOvers: "20",
    awayScore: "172/9", awayOvers: "20",
    note: "New Zealand won by 87 runs"
  },
  {
    id: "match-03", status: "Completed", format: "T20",
    date: "27 Oct 2026", time: "TBD",
    venue: "Hnry Stadium", city: "Wellington",
    home: "New Zealand", away: "India",
    homeScore: "198/3", homeOvers: "20",
    awayScore: "199/4", awayOvers: "13.2",
    note: "India won by 6 wickets"
  },
  {
    id: "match-04", status: "Completed", format: "T20",
    date: "24 Oct 2026", time: "TBD",
    venue: "Hagley Oval", city: "Christchurch",
    home: "New Zealand", away: "India",
    homeScore: "180/5", homeOvers: "20",
    awayScore: "181/6", awayOvers: "19.5",
    note: "India won by 4 wickets"
  },
  {
    id: "match-05", status: "Completed", format: "T20",
    date: "22 Oct 2026", time: "TBD",
    venue: "Hagley Oval", city: "Christchurch",
    home: "New Zealand", away: "India",
    homeScore: "225/4", homeOvers: "20",
    awayScore: "230/6", awayOvers: "19.4",
    note: "India won by 4 wickets"
  },

  // AFGHANISTAN vs ZIMBABWE — 2026 T20I SERIES
  {
    id: "match-06", status: "Completed", format: "T20",
    date: "01 Nov 2026", time: "TBD",
    venue: "Sharjah Cricket Stadium", city: "Sharjah",
    home: "Afghanistan", away: "Zimbabwe",
    homeScore: "81/3", homeOvers: "8.1",
    awayScore: "79/10", awayOvers: "14.3",
    note: "Afghanistan won by 7 wickets"
  },
  {
    id: "match-07", status: "Completed", format: "T20",
    date: "29 Oct 2026", time: "TBD",
    venue: "Sharjah Cricket Stadium", city: "Sharjah",
    home: "Afghanistan", away: "Zimbabwe",
    homeScore: "221/7", homeOvers: "20",
    awayScore: "202/5", awayOvers: "20",
    note: "Afghanistan won by 19 runs"
  },
  {
    id: "match-08", status: "Completed", format: "T20",
    date: "27 Oct 2026", time: "TBD",
    venue: "Sharjah Cricket Stadium", city: "Sharjah",
    home: "Afghanistan", away: "Zimbabwe",
    homeScore: "177/10", homeOvers: "19.5",
    awayScore: "140/10", awayOvers: "19.1",
    note: "Afghanistan won by 37 runs"
  },

  // ICC T20 WORLD CUP AFRICA QUALIFIER — 2026
  {
    id: "match-09", status: "Completed", format: "T20",
    date: "25 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Gambia", away: "Lesotho",
    homeScore: "112/9", homeOvers: "20",
    awayScore: "—", awayOvers: "—",
    note: "Gambia won by 3 runs"
  },
  {
    id: "match-10", status: "Completed", format: "T20",
    date: "25 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Mozambique", away: "Zambia",
    homeScore: "110/7", homeOvers: "19",
    awayScore: "—", awayOvers: "—",
    note: "Mozambique won by 3 wickets"
  },
  {
    id: "match-11", status: "Completed", format: "T20",
    date: "25 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Nigeria", away: "Uganda",
    homeScore: "148/10", homeOvers: "19.4",
    awayScore: "—", awayOvers: "—",
    note: "Nigeria won by 1 run"
  },
  {
    id: "match-12", status: "Completed", format: "T20",
    date: "24 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Mozambique", away: "Uganda",
    homeScore: "19/10", homeOvers: "7.2",
    awayScore: "23/0", awayOvers: "0.5",
    note: "Uganda won by 10 wickets"
  },
  {
    id: "match-13", status: "Completed", format: "T20",
    date: "24 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Gambia", away: "Zambia",
    homeScore: "93/9", homeOvers: "20",
    awayScore: "97/2", awayOvers: "11.4",
    note: "Zambia won by 8 wickets"
  },
  {
    id: "match-14", status: "Completed", format: "T20",
    date: "24 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Nigeria", away: "Lesotho",
    homeScore: "65/3", homeOvers: "7.4",
    awayScore: "62/10", awayOvers: "12.5",
    note: "Nigeria won by 7 wickets"
  },
  {
    id: "match-15", status: "Completed", format: "T20",
    date: "23 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Nigeria", away: "Mozambique",
    homeScore: "94/3", homeOvers: "8.3",
    awayScore: "93/10", awayOvers: "19.4",
    note: "Nigeria won by 7 wickets"
  },
  {
    id: "match-16", status: "Completed", format: "T20",
    date: "23 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Lesotho", away: "Zambia",
    homeScore: "58/10", homeOvers: "13.4",
    awayScore: "61/3", awayOvers: "7.4",
    note: "Zambia won by 7 wickets"
  },
  {
    id: "match-17", status: "Completed", format: "T20",
    date: "23 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Gambia", away: "Uganda",
    homeScore: "27/10", homeOvers: "8.2",
    awayScore: "28/0", awayOvers: "1.4",
    note: "Uganda won by 10 wickets"
  },
  {
    id: "match-18", status: "Completed", format: "T20",
    date: "21 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Gambia", away: "Mozambique",
    homeScore: "120/8", homeOvers: "20",
    awayScore: "148/6", awayOvers: "20",
    note: "Mozambique won by 28 runs"
  },
  {
    id: "match-19", status: "Completed", format: "T20",
    date: "21 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Lesotho", away: "Uganda",
    homeScore: "87/10", homeOvers: "19.3",
    awayScore: "89/5", awayOvers: "12.3",
    note: "Uganda won by 5 wickets"
  },
  {
    id: "match-20", status: "Completed", format: "T20",
    date: "21 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Nigeria", away: "Zambia",
    homeScore: "146/1", homeOvers: "14.5",
    awayScore: "142/9", awayOvers: "20",
    note: "Nigeria won by 9 wickets"
  },
  {
    id: "match-21", status: "Completed", format: "T20",
    date: "20 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Uganda", away: "Zambia",
    homeScore: "195/6", homeOvers: "20",
    awayScore: "108/10", awayOvers: "17.3",
    note: "Uganda won by 87 runs"
  },
  {
    id: "match-22", status: "Completed", format: "T20",
    date: "20 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 1", city: "Abuja",
    home: "Lesotho", away: "Mozambique",
    homeScore: "169/8", homeOvers: "20",
    awayScore: "95/10", awayOvers: "18.2",
    note: "Lesotho won by 74 runs"
  },
  {
    id: "match-23", status: "Completed", format: "T20",
    date: "20 Oct 2026", time: "TBD",
    venue: "Nigeria Cricket Federation Oval 2", city: "Abuja",
    home: "Nigeria", away: "Gambia",
    homeScore: "262/1", homeOvers: "20",
    awayScore: "102/10", awayOvers: "17.2",
    note: "Nigeria won by 160 runs"
  },

  // WEST INDIES vs INDIA — 2026 T20I SERIES
  {
    id: "match-24", status: "Completed", format: "T20",
    date: "17 Oct 2026", time: "TBD",
    venue: "M Chinnaswamy Stadium", city: "Bengaluru",
    home: "India", away: "West Indies",
    homeScore: "118/5", homeOvers: "7.4",
    awayScore: "—", awayOvers: "—",
    note: "No result"
  },
  {
    id: "match-25", status: "Completed", format: "T20",
    date: "14 Oct 2026", time: "TBD",
    venue: "Rajiv Gandhi International Stadium", city: "Hyderabad",
    home: "India", away: "West Indies",
    homeScore: "223/10", homeOvers: "19.3",
    awayScore: "247/3", awayOvers: "20",
    note: "West Indies won by 24 runs"
  },
  {
    id: "match-26", status: "Completed", format: "T20",
    date: "11 Oct 2026", time: "TBD",
    venue: "Holkar Cricket Stadium", city: "Indore",
    home: "India", away: "West Indies",
    homeScore: "223/10", homeOvers: "20",
    awayScore: "209/7", awayOvers: "20",
    note: "India won by 14 runs"
  },
  {
    id: "match-27", status: "Completed", format: "T20",
    date: "09 Oct 2026", time: "TBD",
    venue: "JSCA International Stadium Complex", city: "Ranchi",
    home: "India", away: "West Indies",
    homeScore: "249/5", homeOvers: "20",
    awayScore: "252/4", awayOvers: "18.3",
    note: "West Indies won by 6 wickets"
  },
  {
    id: "match-28", status: "Completed", format: "T20",
    date: "06 Oct 2026", time: "TBD",
    venue: "Ekana Cricket Stadium", city: "Lucknow",
    home: "India", away: "West Indies",
    homeScore: "172/2", homeOvers: "14.4",
    awayScore: "171/10", awayOvers: "19.1",
    note: "India won by 8 wickets"
  },

  // ASIA QUALIFIER B — 2026
  {
    id: "match-29", status: "Completed", format: "T20",
    date: "14 Oct 2026", time: "TBD",
    venue: "Bayuemas Oval", city: "Kuala Lumpur",
    home: "Malaysia", away: "China",
    homeScore: "63/4", homeOvers: "7.2",
    awayScore: "60/10", awayOvers: "20",
    note: "Malaysia won by 6 wickets"
  },
  {
    id: "match-30", status: "Completed", format: "T20",
    date: "14 Oct 2026", time: "TBD",
    venue: "Bayuemas Oval", city: "Kuala Lumpur",
    home: "Hong Kong", away: "Singapore",
    homeScore: "172/5", homeOvers: "20",
    awayScore: "134/10", awayOvers: "18",
    note: "Hong Kong won by 38 runs"
  },
  {
    id: "match-31", status: "Completed", format: "T20",
    date: "14 Oct 2026", time: "TBD",
    venue: "YSD-UKM Cricket Oval", city: "Bangi",
    home: "Maldives", away: "Saudi Arabia",
    homeScore: "69/10", homeOvers: "17.1",
    awayScore: "194/5", awayOvers: "20",
    note: "Saudi Arabia won by 125 runs"
  },
  {
    id: "match-32", status: "Completed", format: "T20",
    date: "12 Oct 2026", time: "TBD",
    venue: "Bayuemas Oval", city: "Kuala Lumpur",
    home: "Malaysia", away: "Singapore",
    homeScore: "149/5", homeOvers: "20",
    awayScore: "112/10", awayOvers: "19",
    note: "Malaysia won by 37 runs"
  },
  {
    id: "match-33", status: "Completed", format: "T20",
    date: "12 Oct 2026", time: "TBD",
    venue: "Selangor Turf Club", city: "Kuala Lumpur",
    home: "China", away: "Saudi Arabia",
    homeScore: "34/8", homeOvers: "10",
    awayScore: "98/6", awayOvers: "10",
    note: "Saudi Arabia won by 64 runs"
  },
  {
    id: "match-34", status: "Completed", format: "T20",
    date: "11 Oct 2026", time: "TBD",
    venue: "Bayuemas Oval", city: "Kuala Lumpur",
    home: "Hong Kong", away: "Saudi Arabia",
    homeScore: "158/10", homeOvers: "19.3",
    awayScore: "168/6", awayOvers: "20",
    note: "Saudi Arabia won by 10 runs"
  },
  {
    id: "match-35", status: "Completed", format: "T20",
    date: "11 Oct 2026", time: "TBD",
    venue: "YSD-UKM Cricket Oval", city: "Bangi",
    home: "Malaysia", away: "Maldives",
    homeScore: "127/4", homeOvers: "8.5",
    awayScore: "125/9", awayOvers: "20",
    note: "Malaysia won by 6 wickets"
  },
  {
    id: "match-36", status: "Completed", format: "T20",
    date: "11 Oct 2026", time: "TBD",
    venue: "Selangor Turf Club", city: "Kuala Lumpur",
    home: "China", away: "Singapore",
    homeScore: "89/6", homeOvers: "20",
    awayScore: "139/10", awayOvers: "20",
    note: "Singapore won by 50 runs"
  },
  {
    id: "match-37", status: "Completed", format: "T20",
    date: "09 Oct 2026", time: "TBD",
    venue: "Bayuemas Oval", city: "Kuala Lumpur",
    home: "Malaysia", away: "Saudi Arabia",
    homeScore: "137/2", homeOvers: "20",
    awayScore: "139/7", awayOvers: "19.1",
    note: "Saudi Arabia won by 3 wickets"
  },
  {
    id: "match-38", status: "Completed", format: "T20",
    date: "09 Oct 2026", time: "TBD",
    venue: "YSD-UKM Cricket Oval", city: "Bangi",
    home: "China", away: "Hong Kong",
    homeScore: "40/10", homeOvers: "13.2",
    awayScore: "41/2", awayOvers: "3.4",
    note: "Hong Kong won by 8 wickets"
  },
  {
    id: "match-39", status: "Completed", format: "T20",
    date: "09 Oct 2026", time: "TBD",
    venue: "Selangor Turf Club", city: "Kuala Lumpur",
    home: "Maldives", away: "Singapore",
    homeScore: "155/7", homeOvers: "20",
    awayScore: "188/6", awayOvers: "20",
    note: "Singapore won by 33 runs"
  },
  {
    id: "match-40", status: "Completed", format: "T20",
    date: "08 Oct 2026", time: "TBD",
    venue: "Bayuemas Oval", city: "Kuala Lumpur",
    home: "China", away: "Maldives",
    homeScore: "96/10", homeOvers: "16.3",
    awayScore: "100/0", awayOvers: "10.1",
    note: "Maldives won by 10 wickets"
  },

  // UPCOMING — VERIFIED 2026 FIXTURES
  {
    id: "match-41", status: "Upcoming", format: "ODI",
    date: "10 Nov 2026", time: "TBD",
    venue: "Seddon Park", city: "Hamilton",
    home: "New Zealand", away: "India",
    note: "Upcoming international match"
  },
  {
    id: "match-42", status: "Upcoming", format: "ODI",
    date: "13 Nov 2026", time: "TBD",
    venue: "Bay Oval", city: "Mount Maunganui",
    home: "New Zealand", away: "India",
    note: "Upcoming international match"
  },
  {
    id: "match-43", status: "Upcoming", format: "ODI",
    date: "13 Nov 2026", time: "TBD",
    venue: "Perth Stadium", city: "Perth",
    home: "Australia", away: "England",
    note: "Upcoming international match"
  },
  {
    id: "match-44", status: "Upcoming", format: "ODI",
    date: "15 Nov 2026", time: "TBD",
    venue: "Adelaide Oval", city: "Adelaide",
    home: "Australia", away: "England",
    note: "Upcoming international match"
  },
  {
    id: "match-45", status: "Upcoming", format: "ODI",
    date: "15 Nov 2026", time: "TBD",
    venue: "Bay Oval", city: "Mount Maunganui",
    home: "New Zealand", away: "India",
    note: "Upcoming international match"
  },
  {
    id: "match-46", status: "Upcoming", format: "ODI",
    date: "18 Nov 2026", time: "TBD",
    venue: "Bellerive Oval", city: "Hobart",
    home: "Australia", away: "England",
    note: "Upcoming international match"
  },
  {
    id: "match-47", status: "Upcoming", format: "T20",
    date: "21 Nov 2026", time: "TBD",
    venue: "Melbourne Cricket Ground", city: "Melbourne",
    home: "Australia", away: "England",
    note: "Upcoming T20 international"
  },
  {
    id: "match-48", status: "Upcoming", format: "T20",
    date: "24 Nov 2026", time: "TBD",
    venue: "Carrara Oval", city: "Carrara",
    home: "Australia", away: "England",
    note: "Upcoming T20 international"
  },
  {
    id: "match-49", status: "Upcoming", format: "T20",
    date: "27 Nov 2026", time: "TBD",
    venue: "Brisbane Cricket Ground", city: "Brisbane",
    home: "Australia", away: "England",
    note: "Upcoming T20 international"
  },
  {
    id: "match-50", status: "Upcoming", format: "T20",
    date: "29 Nov 2026", time: "TBD",
    venue: "Sydney Cricket Ground", city: "Sydney",
    home: "Australia", away: "England",
    note: "Upcoming T20 international"
  }
  
];



export const players = [
  { id: "player-virat", name: "Virat Kohli", country: "India", role: "Batter", batting: "Right-hand bat", bowling: "Right-arm medium", matches: 125, runs: "4,188", average: "48.7", strikeRate: "137.2", wickets: 4, economy: "8.8", image: "https://i.ibb.co/TBh9bhcq/trashed-1796802447-Virat-Kohli-in-PMO-New-Delhi.jpg"},
  { id: "player-smriti", name: "Smriti Mandhana", country: "India", role: "Batter", batting: "Left-hand bat", bowling: "Right-arm offbreak", matches: 136, runs: "3,493", average: "29.4", strikeRate: "123.4", wickets: 0, economy: "—", image: "https://i.ibb.co/SX6bTC33/trashed-1796802447-images.jpg" },
  { id: "player-bumrah", name: "Jasprit Bumrah", country: "India", role: "Bowler", batting: "Right-hand bat", bowling: "Right-arm fast", matches: 133, runs: "69", average: "3.8", strikeRate: "53.1", wickets: 165, economy: "7.3", image: "https://i.ibb.co/tTh28K0m/trashed-1796802448-images-1.jpg" },
  { id: "player-stokes", name: "Ben Stokes", country: "England", role: "All-rounder", batting: "Left-hand bat", bowling: "Right-arm fast-medium", matches: 43, runs: "920", average: "25.6", strikeRate: "134.5", wickets: 28, economy: "8.6", image: "https://i.ibb.co/N2vNNFbJ/trashed-1796802448-images-2.jpg" },
  { id: "player-maxwell", name: "Glenn Maxwell", country: "Australia", role: "All-rounder", batting: "Right-hand bat", bowling: "Right-arm offbreak", matches: 134, runs: "2,771", average: "25.7", strikeRate: "156.4", wickets: 37, economy: "8.3", image: "https://i.ibb.co/yBdtcX9n/trashed-1796802448-images-3.jpg" },
  { id: "player-rashid", name: "Rashid Khan", country: "Afghanistan", role: "Bowler", batting: "Right-hand bat", bowling: "Right-arm legbreak", matches: 121, runs: "545", average: "13.6", strikeRate: "152.7", wickets: 149, economy: "6.8", image: "https://i.ibb.co/8npmn1KN/trashed-1796802447-images-4.jpg" },
];

export const news = [
  { id: "news-conditions", category: "Match preview", title: "Reading the conditions: how a Mumbai surface shapes a T20 chase", summary: "A closer look at the ground, pace and matchups that can shift the momentum under the Wankhede lights.", date: "07 Oct 2026", image: stadium, content: "Wankhede is known for its lively atmosphere and a surface that can reward positive stroke play. Teams planning a chase often weigh the new-ball movement against the value of keeping wickets in hand for the closing overs. Conditions are only one part of the story: the score, wickets and recent scoring rate all shape the likely finish." },
  { id: "news-data", category: "Analysis", title: "What the last five overs can tell us about an innings", summary: "Recent scoring pace adds useful context when estimating a T20 innings total.", date: "06 Oct 2026", image: cricketAction, content: "A short recent window can reflect changes in batter intent, bowling matchups and field settings. It is not a guarantee of what comes next, but it adds context alongside the current score, wickets and overs completed. Our predictor combines these match-state inputs through its trained model." },
  { id: "news-youth", category: "Features", title: "The next generation bringing fearless energy to the game", summary: "Young players are finding new ways to make an impact across formats.", date: "04 Oct 2026", image: cricketGround, content: "Across modern cricket, emerging players are making their mark with adaptability and confidence. Strong domestic pathways and a willingness to learn across formats continue to broaden the game and create new stories for supporters." },
  { id: "news-captains", category: "Tactics", title: "Captaincy in the final overs: the value of one brave decision", summary: "Field changes, bowling options and calm choices can decide a close finish.", date: "02 Oct 2026", image: stadium, content: "The closing overs test planning as much as execution. Captains balance boundary protection with wicket-taking options, while bowlers look for variations that match the conditions. A single well-timed change can alter the shape of a chase." },
];

export const heroImage = stadium;

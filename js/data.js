var TUTOR_DATA = [
    {id:1,name:"Dr. Sarah Johnson",subjects:["Mathematics","Physics"],experience:"12 Years",experienceYears:12,qualification:"Ph.D. in Mathematics",grades:["High School","Middle School"],location:"New York, NY",rating:4.9,price:50,verified:true,image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:2,name:"James Wilson",subjects:["Chemistry","Biology"],experience:"8 Years",experienceYears:8,qualification:"M.Sc. in Biochemistry",grades:["Middle School","High School"],location:"London, UK",rating:4.8,price:40,verified:true,image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:3,name:"Emily Chen",subjects:["English","Social Studies"],experience:"5 Years",experienceYears:5,qualification:"B.A. in English Literature",grades:["Elementary","Middle School"],location:"Toronto, CA",rating:4.7,price:35,verified:true,image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:4,name:"Michael Brown",subjects:["Computer Science","Mathematics"],experience:"10 Years",experienceYears:10,qualification:"M.S. in Computer Science",grades:["High School"],location:"San Francisco, CA",rating:5.0,price:60,verified:true,image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:5,name:"Aisha Patel",subjects:["Biology","Science"],experience:"7 Years",experienceYears:7,qualification:"M.Ed. in Science Education",grades:["Elementary","Middle School","High School"],location:"Austin, TX",rating:4.9,price:45,verified:true,image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:6,name:"Daniel Okafor",subjects:["Physics","Mathematics"],experience:"9 Years",experienceYears:9,qualification:"M.Sc. in Applied Physics",grades:["Middle School","High School"],location:"Chicago, IL",rating:4.8,price:48,verified:true,image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:7,name:"Meera Krishnan",subjects:["Tamil","Mathematics"],experience:"6 Years",experienceYears:6,qualification:"B.Ed. in Mathematics",grades:["Elementary","Middle School"],location:"Chennai, IN",rating:4.9,price:28,verified:true,image:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=500&q=85"},
    {id:8,name:"Rohan Sharma",subjects:["Hindi","Social Studies"],experience:"4 Years",experienceYears:4,qualification:"M.A. in Hindi Literature",grades:["Elementary","Middle School","High School"],location:"Delhi, IN",rating:4.6,price:25,verified:false,image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&h=500&q=85"}
];
var SUBJECT_DATA = [
    {id:1,name:"Mathematics",icon:"calculator",tutors:120,image:"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80"},
    {id:2,name:"Science",icon:"flask-conical",tutors:95,image:"https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80"},
    {id:3,name:"English",icon:"book-open",tutors:150,image:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=500&q=80"},
    {id:4,name:"Physics",icon:"atom",tutors:80,image:"https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=500&q=80"},
    {id:5,name:"Chemistry",icon:"beaker",tutors:70,image:"https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=500&q=80"},
    {id:6,name:"Biology",icon:"dna",tutors:85,image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80"},
    {id:7,name:"Computer Science",icon:"code-2",tutors:66,image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"},
    {id:8,name:"Social Studies",icon:"globe-2",tutors:54,image:"https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80"},
    {id:9,name:"Hindi",icon:"languages",tutors:47,image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80"},
    {id:10,name:"Tamil",icon:"languages",tutors:39,image:"https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=500&q=80"}
];
var PREMIUM_TUTOR_DATA = [
    {id:1,name:"Dr. Alina Mercer",role:"Senior Mathematics Tutor",qualification:"Ph.D. in Applied Mathematics",subjects:["Mathematics"],experience:"14 years",grades:["Grades 8–12"],rating:"5.0",price:72,location:"New York, NY",image:"photo-1580489944761-15a19d654956"},
    {id:2,name:"Marcus Bennett",role:"Science Specialist",qualification:"M.Sc. in Environmental Science",subjects:["Science"],experience:"11 years",grades:["Grades 5–10"],rating:"4.9",price:64,location:"London, UK",image:"photo-1560250097-0b93528c311a"},
    {id:3,name:"Sofia Laurent",role:"English Communication Tutor",qualification:"M.A. in English Literature",subjects:["English"],experience:"9 years",grades:["Grades 4–12"],rating:"4.9",price:58,location:"Toronto, CA",image:"photo-1499887142886-791eca5918cd"},
    {id:4,name:"Ethan Cole",role:"Physics Expert",qualification:"M.Sc. in Theoretical Physics",subjects:["Physics"],experience:"12 years",grades:["Grades 9–12"],rating:"5.0",price:70,location:"San Francisco, CA",image:"photo-1568602471122-7832951cc4c5"},
    {id:5,name:"Nadia Rahman",role:"Chemistry Tutor",qualification:"M.Sc. in Organic Chemistry",subjects:["Chemistry"],experience:"8 years",grades:["Grades 8–12"],rating:"4.8",price:62,location:"Austin, TX",image:"photo-1508214751196-bcfd4ca60f91"},
    {id:6,name:"Oliver James",role:"Biology Specialist",qualification:"Ph.D. in Molecular Biology",subjects:["Biology"],experience:"13 years",grades:["Grades 7–12"],rating:"4.9",price:74,location:"Chicago, IL",image:"photo-1544725176-7c40e5a71c5e"},
    {id:7,name:"Priya Nair",role:"Computer Science Instructor",qualification:"M.S. in Computer Science",subjects:["Computer Science"],experience:"10 years",grades:["Grades 6–12"],rating:"5.0",price:68,location:"Seattle, WA",image:"photo-1535713875002-d1d0cf377fde"}
];
var PREMIUM_SUBJECT_DATA = [
    {name:"Mathematics",icon:"calculator",image:"photo-1434030216411-0b793f4b4173",alt:"A student working through mathematics problems"},
    {name:"Science",icon:"flask-conical",image:"photo-1491841550275-ad7854e35ca6",alt:"Books and materials ready for a science lesson"},
    {name:"English",icon:"book-open",image:"photo-1503676260728-1c00da094a0b",alt:"Students reading together at school"},
    {name:"Physics",icon:"atom",image:"photo-1522202176988-66273c2fd55f",alt:"Students sharing ideas during a physics lesson"},
    {name:"Chemistry",icon:"beaker",image:"photo-1524178232363-1fb2b075b655",alt:"A teacher guiding a classroom lesson"},
    {name:"Biology",icon:"dna",image:"photo-1543269865-cbf427effbad",alt:"A group of students learning together"},
    {name:"Computer Science",icon:"code-2",image:"photo-1498243691581-b145c3f54a5a",alt:"A bright library study space"},
    {name:"Social Studies",icon:"globe-2",image:"photo-1516979187457-637abb4f9353",alt:"A student reading and taking notes"},
    {name:"Hindi",icon:"languages",image:"photo-1522661067900-ab829854a57f",alt:"A class working together on a learning activity"},
    {name:"Tamil",icon:"languages",image:"photo-1517486808906-6ca8b3f04846",alt:"Students collaborating in a classroom"}
];
var CLASSIC_GALLERY_DATA = [
    {image:"photo-1427504494785-3a9ca7044f45",alt:"Students learning together in a classroom",label:"Classroom learning"},
    {image:"photo-1544776193-352d25ca82cd",alt:"A tutor helping a child with homework",label:"One-to-one tutoring"},
    {image:"photo-1529070538774-1843cb3265df",alt:"A student reading with a teacher",label:"Guided learning"},
    {image:"photo-1453738773917-9c3eff1db985",alt:"Books and notebooks ready for a lesson",label:"Study time"},
    {image:"photo-1506784983877-45594efa4cbe",alt:"A family planning a student's learning goals",label:"Learning together"}
];
var PREMIUM_EXPERIENCE_DATA = [
    {image:"photo-1531482615713-2afd69097998",alt:"A tutor and student planning a lesson together",label:"One-to-one tutoring"},
    {image:"photo-1584697964358-3e14ca57658b",alt:"A student working through mathematics with a tutor",label:"Maths, made clear"},
    {image:"photo-1580582932707-520aed937b7b",alt:"A tutor guiding a student through a science project",label:"Curiosity in action"},
    {image:"photo-1497633762265-9d179a990aa6",alt:"Books arranged for exam preparation",label:"Ready for exams"},
    {image:"photo-1491013516836-7db643ee125a",alt:"A tutor guiding a student through a digital lesson",label:"Learning, connected"},
    {image:"photo-1531988042231-d39a9cc12a9a",alt:"A family and tutor discussing student progress",label:"Progress, together"}
];
var CLASSIC_PARENT_DATA = [
    {image:"photo-1534528741775-53994a69daeb",alt:"Parent testimonial portrait"},
    {image:"photo-1531123897727-8f129e1688ce",alt:"Parent testimonial portrait"},
    {image:"photo-1524504388940-b1c1722653e1",alt:"Parent testimonial portrait"},
    {image:"photo-1517841905240-472988babdf9",alt:"Parent testimonial portrait"},
    {image:"photo-1534751516642-a1af1ef26a56",alt:"Parent testimonial portrait"}
];
var PREMIUM_PARENT_DATA = [
    {image:"photo-1488426862026-3ee34a7d66df",alt:"HomeTutor parent sharing a success story",name:"Elena M.",grade:"Parent of a Grade 8 student"},
    {image:"photo-1512316609839-ce289d3eba0a",alt:"HomeTutor parent sharing a success story",name:"David P.",grade:"Parent of a Grade 6 student"},
    {image:"photo-1529139574466-a303027c1d8b",alt:"HomeTutor parent sharing a success story",name:"Amara T.",grade:"Parent of a Grade 10 student"},
    {image:"photo-1504593811423-6dd665756598",alt:"HomeTutor parent sharing a success story",name:"Ravi K.",grade:"Parent of a Grade 5 student"}
];

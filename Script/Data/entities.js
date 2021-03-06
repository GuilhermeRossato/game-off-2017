const entities = {
	// Normalize: "  [\n"+genEntity().map((a,i)=>(a.toFixed(5)+(((i%2==1))?",\n":", "))).join("")+"]  "
	player: [
		0.85, 0,
		-0.5, 0.25,
		-0.4, 0,
		-0.5, -0.25,
	],
	soldier: [
		0.50, -0.40,
		1.00, -0.03,
		1.00,  0.03,
		0.50,  0.40,
		0.35,  0.25,
		0.20,  0.40,
		-0.5, 0.4,
		-0.5, -0.4,
		0.20, -0.4,
		0.35, -0.25,
	],
	//genSpike(s=16,res=[],sm=0.5,bg=0.75, ang, len, i) { for (i=0;i<s;i++) { ang = i/s; len = (i%2)?sm:bg; res.push(Math.cos(ang*Math.PI*2)*len, Math.sin(ang*Math.PI*2)*len); } return res; }
	spike: [
		0.75000, 0.00000,
		0.46194, 0.19134,
		0.53033, 0.53033,
		0.19134, 0.46194,
		0.00000, 0.75000,
		-0.19134, 0.46194,
		-0.53033, 0.53033,
		-0.46194, 0.19134,
		-0.75000, 0.00000,
		-0.46194, -0.19134,
		-0.53033, -0.53033,
		-0.19134, -0.46194,
		-0.00000, -0.75000,
		0.19134, -0.46194,
		0.53033, -0.53033,
		0.46194, -0.19134,
	],
	//genShooter = (s=7, res=[], sm=0.4, bi=1, reloc=Math.PI/7, i=0) => { for (i = 0 ; i < s; i++) { res.push(Math.cos(reloc+Math.PI*2*(i/s))*((i%2)?sm:bi), Math.sin(reloc+Math.PI*2*(i/s))*((i%2)?sm:bi)); } return "  [\n"+res.map((a,i)=>(a.toFixed(5)+(((i%2==1))?",\n":", "))).join("")+"]  "; };
	shooter: [
		0.90097, 0.43388*0.85,
		0.08901, 0.38997*0.85,
		-0.62349, 0.78183,
		-0.40000, 0.00000,
		-0.62349, -0.78183,
		0.08901, -0.38997*0.85,
		0.90097, -0.43388*0.85,
	],
	//genTank = (s=16, res=[], i=0) => { for (i = 0 ; i < s; i++) { res.push(Math.cos(Math.PI*2*i/s)*((i%2)?0.7:1), Math.sin(Math.PI*2*i/s))*((i%2)?0.7:1); } return "[\n"+res.map((a,i)=>(a.toFixed(5)+(((i%2==1))?",\n":", "))).join("")+"]"; };
	tank: [
		1.00000, 0.00000,
		0.64672, 0.38268,
		0.70711, 0.70711,
		0.26788, 0.92388,
		0.00000, 1.00000,
		-0.26788, 0.92388,
		-0.70711, 0.70711,
		-0.64672, 0.38268,
		-0.64672, -0.38268,
		-0.70711, -0.70711,
		-0.26788, -0.92388,
		-0.00000, -1.00000,
		0.26788, -0.92388,
		0.70711, -0.70711,
		0.64672, -0.38268,
	]
}
let send_mail = () => {
  let mail_body = document.querySelector("#email_body").textContent;
  let subject = document.querySelector("#subject").textContent;
  let signature = document.querySelector("#sig").textContent;
  let send_to = document.querySelector("#send_to").value

  mail_body = mail_body
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .join("\n\n");
  mail_body += signature;

  let emailSubject = encodeURIComponent(subject);
  let emailBody = encodeURIComponent(mail_body);

  let mailtoLink = `mailto:${send_to}?subject=${emailSubject}&body=${emailBody}`;

  window.location.href = mailtoLink;
};

let update = () => {
  let position = document.querySelector("#position").value;
  let company = document.querySelector("#company").value;

  let node = `
<h3 id='subject'>Application for ${position}</h3>

<div id='email_body'>
<br />
Dear Hiring Manager 
<br />

I hope this email finds you well. My name is Angel Macwan, and I am writing to express my strong interest in the ${position} position at ${company}.
<br />

As a Data Scientist with a Master's in Data Science from Amity University and a Bachelor's in Computer Application and Information Technology from Sardar Patel University, I bring a diverse skill set that includes expertise in Python, R, Java, JavaScript, Spark, Hadoop, TensorFlow, and PyTorch. Currently employed as a Systems Engineer/Big Data Engineer at IBM India, I have hands-on experience in working with big data systems for management and analysis using AWS, Azure, Hadoop, Spark, and DataBricks.
<br />

During my time at IBM, I have excelled in research-driven projects, particularly in Deep Learning, Natural Language Processing, and AI Automation. My proficiency in programming, coupled with my problem-solving skills and real-world corporate experience, positions me as a valuable candidate.
<br />

In my previous role as a Data Science Intern at Mindworks Group, I developed an innovative visualization library that significantly reduced the time required for animated visualizations. My experience extends to software analysis at Tata Consultancy Services, where I designed and maintained APIs, tested microservices, and worked with technologies such as React, Node, Python, and Java.
<br />

I am confident that my skills and experiences align well with the requirements of the ${position} role, and I am eager to contribute my expertise to your dynamic team.
<br />

Enclosed is my resume, which provides further details about my educational background, professional experience, and certifications, including the Databricks Certified Associate Developer for Apache Spark 3.0.
<br />

I am available at your earliest convenience for an interview and can be reached via email at <b>armacwan@gmail.com</b> or by phone at <b>(+91) 7405448639</b>.
<br />

Thank you for considering my application. <br />
I look forward to a positive response.
<br />
<br />
</div>

<div id = 'sig'>
---<br />
Sincerely, <br />
Angel Macwan<br />
armacwan@gmail.com<br />
<b>angelmacwan.github.io</b>
</div>
`;

  document.querySelector(".output").innerHTML = node;
};

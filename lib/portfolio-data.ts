export interface Project {
  id: string;
  index: string;
  titlePrefix: string;
  titleItalic: string;
  titleSuffix?: string;
  category: 'bio' | 'data' | 'apps';
  role: string;
  domain: string;
  stack: string;
  year: string;
  badge?: string;
  githubUrl?: string;
  previewMeta: string;
  pgTitle: string;
  context: string;
  craft: string;
  impact: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'mgd-ocular-morphometrics',
    index: '01',
    titlePrefix: 'OCULAR',
    titleItalic: 'morphometrics',
    titleSuffix: 'AI',
    category: 'bio',
    role: 'Researcher & ML Engineer (Pending Publication)',
    domain: 'Computational Biology & Clinical CV',
    stack: 'PyTorch · SegFormer · OpenCV · SciPy · Clinical Vision',
    year: '2025',
    badge: 'RESEARCH / PENDING PUB',
    githubUrl: 'https://github.com/angelmacwan',
    previewMeta: 'IR MEIBOGRAPHY SEGFORMER MASK',
    pgTitle: 'CLINICAL VISION SCANNER — ADJUST SEGMENTATION THRESHOLD',
    context:
      'Meibomian Gland Dysfunction (MGD) is the primary driver of evaporative dry-eye disease globally. In clinical practice, evaluating infrared eyelid meibography remains predominantly subjective, time-intensive, and prone to high inter-grader variability between optometrists and ophthalmologists.',
    craft:
      'Formulated novel quantitative metrics and trained hierarchical vision models to segment infrared ocular images into exact anatomical regions of interest (the whole meibomian gland plate) and individual functional glands. Implemented medial-axis skeletonization algorithms to extract continuous gland length, tortuosity curvature, and atrophy dropout densities automatically.',
    impact:
      'Engineered sub-second per-scan inference with ~0.89 IoU boundary precision, converting qualitative subjective grading into reproducible, continuous vector biomarkers for clinical trials and diagnostic workflows.'
  },
  {
    id: 'disease-gene-nlp',
    index: '02',
    titlePrefix: 'DISEASE-GENE',
    titleItalic: 'literature',
    titleSuffix: 'NLP',
    category: 'bio',
    role: 'AI & NLP Researcher (Pending Publication)',
    domain: 'Biomedical Text Mining & Knowledge Graphs',
    stack: 'BERT · BioBERT · PyTorch · Transformers · NetworkX',
    year: '2025',
    badge: 'RESEARCH / PENDING PUB',
    githubUrl: 'https://github.com/angelmacwan/Disease-Gene-Association-Classification',
    previewMeta: 'BIOMEDICAL KNOWLEDGE GRAPH EXTRACTION',
    pgTitle: 'LITERATURE EXTRACTION ENGINE — TUNE RELATION CONFIDENCE',
    context:
      'Tens of millions of biomedical research papers and clinical trial reports exist across PubMed and medical journals, hiding millions of undiscovered disease-gene associations. Manual database curation cannot keep pace with biomedical literature expansion.',
    craft:
      'Designed end-to-end text mining and deep learning architectures leveraging BERT, deep neural networks, and recurrent sequence models to identify and classify disease-gene associations directly from unstructured medical abstracts. Built custom biomedical entity recognition and relation extraction pipelines that link mutated genomic loci to clinical phenotypes.',
    impact:
      'Extracted high-confidence candidate associations from massive unstructured medical corpora, mapping discovered relationships into queryable knowledge graphs with automated sentence-level attention attribution.'
  },
  {
    id: 'ibm-enterprise-data-mesh',
    index: '03',
    titlePrefix: 'ENTERPRISE',
    titleItalic: 'data',
    titleSuffix: 'MESH',
    category: 'data',
    role: 'Data Engineer @ IBM',
    domain: 'Enterprise Cloud Data Systems',
    stack: 'Snowflake · Databricks · Python · AWS · SQL · PySpark',
    year: '2024–PRESENT',
    badge: 'ENTERPRISE ARCHITECTURE',
    githubUrl: 'https://www.linkedin.com/in/angel-im/',
    previewMeta: 'SNOWFLAKE ZERO-COPY TOPOLOGY',
    pgTitle: 'ENTERPRISE PIPELINE MESH — INJECT TRAFFIC & TUNE CADENCE',
    context:
      'Large-scale enterprise analytics ecosystems grapple with disparate data stores, slow batch cadences, and security compliance risks when cross-functional business units require unified analytical datasets.',
    craft:
      'Architected metadata-driven data enablement platforms and resilient snapshot pipelines utilizing Snowflake, Databricks, Python, and AWS cloud infrastructure. Implemented zero-copy data cloning patterns, automated data lineage tracking, and declarative Role-Based Access Control (RBAC) governance structures that enforce freshness SLAs and schema contracts.',
    impact:
      'Eliminated brittle manual ETL syncs, slashed pipeline provisioning latency for downstream BI and ML teams, and established provable audit-ready data lineage across multi-tenant enterprise domains.'
  },
  {
    id: 'thallus-social-simulation',
    index: '04',
    titlePrefix: 'THALLUS',
    titleItalic: 'agent',
    titleSuffix: 'SIMULATOR',
    category: 'apps',
    role: 'Creator & Lead Architect',
    domain: 'Multi-Agent AI & Emergent Simulation',
    stack: 'Python · LLMs · Knowledge Graphs · Ontologies · FastAPI',
    year: '2025',
    badge: 'AGENTIC ENGINE',
    githubUrl: 'https://github.com/angelmacwan',
    previewMeta: 'AGENT ONTOLOGY & POPULATION GRAPH',
    pgTitle: 'MULTI-AGENT SANDBOX — STEP ROUNDS & OBSERVE CONVERGENCE',
    context:
      'Traditional survey methods and static language model prompting fail to capture the dynamic, cascading nature of human discourse, viral narrative formation, and consensus emergence across diverse demographics.',
    craft:
      'Engineered a complete social-media simulation engine. From one or more seed documents, Thallus automatically constructs a underlying knowledge graph, derives a formal domain ontology, synthesizes an idiosyncratic population of autonomous AI agents with diverse personas and bias priors, runs multi-round interactive conversational simulations, and exposes a natural language query interface to generate rich analytical reports.',
    impact:
      'Delivered an observable sandbox for behavioral researchers, brand strategists, and policy analysts to simulate public discourse reaction, ideological polarization, and viral propagation dynamics before public rollout.'
  },
  {
    id: 'pluto-visual-pipeline',
    index: '05',
    titlePrefix: 'PLUTO',
    titleItalic: 'workflow',
    titleSuffix: 'BLUEPRINTS',
    category: 'apps',
    role: 'Creator & Developer',
    domain: 'Visual Programming & Code Synthesis',
    stack: 'React · TypeScript · Python CodeGen · Canvas · Node Graph',
    year: '2025',
    badge: 'DEVTOOL / OPEN SOURCE',
    githubUrl: 'https://github.com/angelmacwan/pluto',
    previewMeta: 'PROCEDURAL CODE COMPILATION GRAPH',
    pgTitle: 'VISUAL PIPELINE RUNNER — DISPATCH NODES & COMPILE PYTHON',
    context:
      'Designing machine learning experiments and data pipelines often forces developers into repetitive boilerplate script maintenance or rigid, opaque black-box GUI tools that cannot be exported to code. Inspired by Unreal Engine Blueprints.',
    craft:
      'Engineered a visual node-based machine learning workflow builder. Users interactively arrange data ingestion sources, feature scalers, model architectures, and validation checkpoints on a fluid infinite canvas. Pluto verifies node type contracts in real time and automatically compiles the graph into clean, executable, modular Python code.',
    impact:
      'Significantly accelerated pipeline prototyping for data scientists and ML practitioners, providing both the intuitive speed of visual node wiring and the transparency of production-ready Python code generation.'
  },
  {
    id: 'enterprise-private-rag',
    index: '06',
    titlePrefix: 'PRIVATERAG',
    titleItalic: 'enterprise',
    titleSuffix: 'PLATFORM',
    category: 'data',
    role: 'Creator & Backend Architect',
    domain: 'Enterprise Retrieval & Security Systems',
    stack: 'Python · Vector DB · Gemini / LLMs · FastAPI · RBAC',
    year: '2024',
    badge: 'SYSTEMS SECURITY',
    githubUrl: 'https://github.com/angelmacwan/PrivateRAG',
    previewMeta: 'SEMANTIC VECTOR ACCESS BOUNDARY',
    pgTitle: 'RBAC RETRIEVAL GATE — SIMULATE USER ROLES & ACCESS GRANTS',
    context:
      'Deploying retrieval-augmented generation (RAG) in corporate settings requires airtight isolation between departmental silos. Generic RAG implementations risk leaking sensitive HR, financial, or executive documents to unauthorized staff.',
    craft:
      'Built a batteries-included enterprise RAG platform with built-in connectors to cloud object stores and external enterprise services. Features a robust Role-Based Access Control (RBAC) security layer, immutable audit trails, semantic embedding rerankers, and scalable document chunking strategies.',
    impact:
      'Provided zero-trust question-answering across corporate knowledge bases with cryptographically backed role isolation, eliminating hallucination risks and cross-department document leakage.'
  },
  {
    id: 'evolutionary-algorithms-lab',
    index: '07',
    titlePrefix: 'EVOLUTIONARY',
    titleItalic: 'neural',
    titleSuffix: 'AGENTS',
    category: 'apps',
    role: 'AI Researcher & Developer',
    domain: 'Evolutionary Computation & Heuristics',
    stack: 'Python · Genetic Algorithms · Neural Networks · Simulation',
    year: '2024',
    badge: 'HEURISTICS RESEARCH',
    githubUrl: 'https://github.com/angelmacwan/Genetic-Algorithms-and-Neural-Agents',
    previewMeta: 'GENOME FITNESS EVOLUTION LANDSCAPE',
    pgTitle: 'GENETIC HEURISTICS — SIMULATE MUTATION & FITNESS EVOLUTION',
    context:
      'Investigating optimization problems and autonomous navigation where gradient-based backpropagation is computationally prohibitive or reward feedback is sparse and non-differentiable.',
    craft:
      'Formulated evolutionary algorithms combined with lightweight neural network controllers to evolve autonomous driving policies. Simulated multi-agent environments applying stochastic selection, crossover, and point mutation over successive generations without manual supervision.',
    impact:
      'Demonstrated robust emergent obstacle avoidance and optimal trajectory planning solely driven by evolutionary fitness pressures.'
  }
];

export const DISCIPLINES = [
  {
    index: '01',
    title: 'Enterprise Data Engineering @ IBM',
    tagline: 'Snowflake · Databricks · Python · AWS · Governance',
    philosophy:
      'Enterprise data platforms fail when governance is bolted on as an afterthought. At IBM, I architect metadata-driven Enablement Zones, streaming/batch ingestion pipelines, and automated zero-copy Snowflake snapshot models so analytics and AI teams consume trustworthy, SLA-backed datasets at scale.',
    domains: [
      'ZERO-COPY DATA ARCHITECTURE',
      'ENTERPRISE METADATA MESH',
      'FINE-GRAINED RBAC & SECURITY',
      'DATA DRIFT & FRESHNESS MONITORING'
    ],
    toolkit: [
      'SNOWFLAKE / DATABRICKS',
      'PYTHON / SQL / PYSPARK',
      'AWS (S3, LAMBDA, GLUE)',
      'CI/CD & DATA LINEAGE'
    ]
  },
  {
    index: '02',
    title: 'AI, ML & Computational Biology Research',
    tagline: 'Meibomian Glands · Clinical Vision · Biomedical NLP · Pending Pub',
    philosophy:
      'Bridging modern vision architectures and biomedical language models with empirical clinical rigor. My academic research translates raw infrared ocular meibography and tens of millions of biomedical literature publications into quantitative, interpretable biomarkers and structured knowledge graphs.',
    domains: [
      'MGD GLAND SEGMENTATION',
      'OCULAR ATROPHY METRICS',
      'DISEASE-GENE ASSOCIATION MINING',
      'BIOMEDICAL NLP & TRANSFORMERS'
    ],
    toolkit: [
      'PYTORCH / TENSORFLOW',
      'SEGFORMER / OPENCV / SCIPY',
      'BERT / BIOBERT / HUGGING FACE',
      'CLINICAL MORPHOMETRICS'
    ]
  },
  {
    index: '03',
    title: 'Autonomous Agents, Pipeline Engines & Systems',
    tagline: 'Thallus Multi-Agent Sim · Pluto Blueprints · Enterprise PrivateRAG',
    philosophy:
      'True software craft emerges from building ambitious systems from zero to production. Whether synthesizing multi-agent social simulations, creating visual blueprint builders that compile to Python, or securing enterprise RAG platforms with granular RBAC, I obsess over modularity, performance, and developer utility.',
    domains: [
      'MULTI-AGENT SOCIAL SIMULATIONS',
      'VISUAL PIPELINE CODE COMPILERS',
      'ENTERPRISE SECURE RAG WITH RBAC',
      'EVOLUTIONARY & GENETIC ALGORITHMS'
    ],
    toolkit: [
      'PYTHON / FASTAPI / DOCKER',
      'KNOWLEDGE GRAPHS / ONTOLOGIES',
      'REACT / TYPESCRIPT / CANVAS',
      'VECTOR DATABASES / EMBEDDINGS'
    ]
  }
];

export const SKILLS_MATRIX = {
  languages: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Go', 'C++', 'Java', 'R'],
  dataCloud: ['Snowflake', 'Databricks', 'AWS (S3, EMR, Lambda)', 'PySpark', 'Hadoop', 'PostgreSQL', 'NoSQL', 'Kafka'],
  aiResearch: ['PyTorch', 'TensorFlow', 'SegFormer', 'BERT / BioBERT', 'OpenCV', 'SciPy', 'Transformers', 'Genetic Algorithms'],
  systemsTools: ['FastAPI', 'Docker', 'Git / GitHub CI-CD', 'Vector DBs (Chroma/Milvus)', 'LangChain / LlamaIndex', 'Node Graphs', 'Linux']
};

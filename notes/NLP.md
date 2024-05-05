# NLTK

`pip3 install nltk`

```python
import nltk
nltk.download('all')
```

> [!info] >**Corpora** -> Body of text
> **lexicon** -> Words with meaning

# Tokenizing

**sent_tokenize** -> Sentence Tokenizer, splits sentences in a body of text
**word_tokenize** -> Word Tokenizer, splits words in a sentence

```python
from nltk.tokenize import sent_tokenize, word_tokenize

sampleText = "your text file"
print(sent_tokenize(sampletext))
print(word_tokenize(sampletext))
```

# Chunking

Grouping words in meaningful group

```python
import nltk
from nltk.corpus import state_union
from nltk.tokenize import PunktSentenceTokenizer

train_text = state_union.raw("2005-GWBush.txt")
txt = "Kids are playing. Kids like to play games. He got played"

custTokenizer = PunktSentenceTokenizer(state_union.raw("2006-GWBush.txt"))
tokenizedText = custTokenizer.tokenize(txt)

for i in tokenizedText:
    words = nltk.word_tokenize(i)
    tag = nltk.pos_tag(words)

    chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
    chunkParser = nltk.RegexpParser(chunkGram)
    chunked = chunkParser.parse(tag)
    #chunked.draw()
    chunked.pretty_print()
```

# Stop Words

stop words are words that don't contribute a lot the text, or filler words like "a", "the"... this words are removed so that text can be made easier for machine to understand
`stopwords.words("english")`

```python
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

txt = "your text file / input"

words = word_tokenize(txt)

nw = [i for i in words if i not in stopwords.words("english")]
```

# Named Entity Recognition

The state_union data set will be used for training PunktSentenceTokenizer to create a custom tokenizer

```python
import nltk
from nltk.tokenize import PunktSentenceTokenizer
from nltk.corpus import state_union

txt = "Your text file or input"

custTokenizer = PunktSentenceTokenizer(state_union.raw("2006-GWBush.txt"))
tokenizedText = custTokenizer.tokenize(txt)

for i in tokenizedText:
    words = nltk.word_tokenize(i)
    tag = nltk.pos_tag(words)
    nameEnt = nltk.ne_chunk(tag)
    nameEnt.pretty_print()
```

# Stemming

Stemming is the process of reducing a word to its word stem that affixes to suffixes and prefixes or to the roots of words known as a lemma. `ps.stem("word")`

```python
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

ps = PorterStemmer()

txt = "Kids are playing. Kids like to play games. He got played"
wt = word_tokenize(txt)
print([ps.stem(i) for i in wt])
```

![[Pasted image 20231123162930.png]]

# Lemmatizing

A very similar operation to stemming is called lemmatizing. The major difference between these is, stemming can often create non-existent words, whereas lemmas are actual words.
`pos = "a"` ⇒ Adjective
`pos = "v"` ⇒ Verb

```python
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

print(lemmatizer.lemmatize("cats"))
print(lemmatizer.lemmatize("cacti"))
print(lemmatizer.lemmatize("geese"))
print(lemmatizer.lemmatize("rocks"))
print(lemmatizer.lemmatize("python"))
print(lemmatizer.lemmatize("better", pos="a"))
print(lemmatizer.lemmatize("best", pos="a"))
print(lemmatizer.lemmatize("run"))
print(lemmatizer.lemmatize("run",'v'))
```

# Part of Speech Tagging

```python
import nltk
from nltk.tokenize import PunktSentenceTokenizer
from nltk.corpus import state_union
# state_union data set will be used for training PunktSentenceTokenizer to create a custom tokenizer

txt = "Kids are playing. Kids like to play games. He got played"

custTokenizer = PunktSentenceTokenizer(state_union.raw("2006-GWBush.txt"))
tokenizedText = custTokenizer.tokenize(txt)

for i in tokenizedText:
    words = nltk.word_tokenize(i)
    tag = nltk.pos_tag(words)
    print(tag)
```

---

# Tokenizing

Rather then letters, words are encoded into numbers because different words can have same letters in them
`Tokenizer(num_words = 100)`
in above code, `num_words` refer to the maximum number of words to keep, if we have a huge text body, we can keep only top 100 most used words

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer

sentences = [ "I love my dog", "I love my cat" ]

tokenizer = Tokenizer(num_words = 100) # Creating the model object
tokenizer.fit_on_texts(sentences) # Training the model
print(tokenizer.word_index) # prints tokenized dictionary
# output -> {'i': 1, 'love': 2, 'my': 3, 'dog': 4, 'cat': 5}
```

# Tokenizing Sentences into numbers

if there is an unknown word that is passed in `tokenizer.texts_to_sequences()` method, that word is ignored.
to deal with this, `oov_token` property is passed to `Tokenizer()` object, so whenever a new word is faced, it will be replaced by whatever is passed as argument to `oov_token` in this case it is `<OOV>` as it is unlikely to appear naturally in a body of text.

```python
from tensorflow.keras.preprocessing.text import Tokenizer

sentences = [ "I love my dog", "I love my cat", "you love my dog", "Do you think my dog is amazing? " ]

tokenizer = Tokenizer(num_words = 100, oov_token="<OOV>")
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index

# passing array of sentences to convert to ints
seq = tokenizer.texts_to_sequences([ "He likes my cat", "My dog is amazing!" ])

print(seq)
# [[4, 2, 1, 3], [4, 2, 1, 6], [5, 2, 1, 3], [7, 5, 8, 1, 3, 9, 10]]
```

# Padding

Text input in a mode can be of different sizes, to deal with this Padding is used.
function `pad_sequence()` is used, this method will set the length of all your inputs to the longest string by adding zeros either in front or at end of the sequence
`paddedSeq()` adds zeros in beginning
`paddedSeq(padding='post')` adds zeros at the end
`paddedSeq(seqData, padding='post', maxlen=10, truncating='post')`

```python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

sentences = [ "I love my dog", "I love my cat", "you love my dog", "Do you think my dog is amazing? " ]

tokenizer = Tokenizer(num_words = 100, oov_token="<OOV>")
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index

# passing array of sentences to convert to ints
seq = tokenizer.texts_to_sequences([ "He likes my cat", "My dog is amazing!" ])
paddedSeq = pad_sequences(seq)
print(paddedSeq)
```

---

## Text vectorization

Textual data is converted into numerical vectors that machine learning algorithms can understand.

### Bag of Words (BoW)

-   BoW represents text as a collection of unique words along with their frequencies in the document
-   Each document is represented as a vector, where each dimension corresponds to a unique word, and the value represents the frequency of that word in the document.

```python
from sklearn.feature_extraction.text import CountVectorizer

corpus = [
	"This is the first document.",
	"This document is the second document.",
	"And this is the third one.",
	"Is this the first document?",
]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)

print(vectorizer.get_feature_names_out())
print(X.toarray())
```

### Term Frequency-Inverse Document Frequency (TF-IDF)

TF-IDF stands for _Term Frequency-Inverse Document Frequency_. It's a numerical statistic used in information retrieval and text mining to evaluate the importance of a word in a document relative to a collection of documents. Here's a breakdown of what it entails:

1. **Term Frequency (TF)**: This measures the frequency of a term (word) within a document. It's simply the number of times a term appears in a document divided by the total number of terms in the document. It aims to represent how often a term occurs within a document relative to the total number of terms.
2. **Inverse Document Frequency (IDF)**: This measures how important a term is across the entire corpus of documents. It's calculated by dividing the total number of documents by the number of documents containing the term, and then taking the logarithm of that quotient. It helps in determining the weight of rare terms that may be more significant than common terms.
3. **TF-IDF**: This combines TF and IDF to give a weight to each term in a document. The higher the TF-IDF score of a term in a document, the more important that term is to the document.
   The TF-IDF score is calculated for each term in each document in the corpus. It's commonly used in various natural language processing tasks such as document classification, information retrieval, and text mining to determine the importance of words in a document relative to a collection of documents.

```python
from sklearn.feature_extraction.text import TfidfVectorizer

corpus = [
	"This is the first document.",
	"This document is the second document.",
	"And this is the third one.",
	"Is this the first document?",
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(corpus)

print(vectorizer.get_feature_names_out())
print(X.toarray())
```

### Word Embeddings (e.g., Word2Vec, GloVe)

Word embeddings are a type of word representation in natural language processing (NLP) that captures the semantic meaning of words by mapping them to dense vectors in a continuous vector space.
There are several popular algorithms for generating word embeddings, including Word2Vec, GloVe, and fastText.

**Word2Vec:**
Word2Vec learns distributed representations of words by training a neural network on a large corpus of text. The key idea behind Word2Vec is the distributional hypothesis, which posits that words appearing in similar contexts tend to have similar meanings.

```python
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess

# Sample corpus
corpus = [
    "This is the first document.",
    "This document is the second document.",
    "And this is the third one.",
    "Is this the first document?",
]

# Tokenize the corpus
tokenized_corpus = [simple_preprocess(text) for text in corpus]

# Train Word2Vec model
model = Word2Vec(tokenized_corpus, vector_size=100, window=5, min_count=1, workers=4)

# Get word vectors
word_vectors = model.wv

# Find similar words
similar_words = word_vectors.most_similar("document")
print("Similar words to 'document':", similar_words)

# Get vector for a specific word
vector_for_word = word_vectors["document"]
print("Vector for 'document':", vector_for_word)
```

In this example, we tokenize the corpus into lists of words using `simple_preprocess` from Gensim. Then, we train a Word2Vec model with a vector size of 100, a window size of 5 (maximum distance between the current and predicted word within a sentence), and a minimum word count of 1. After training, we can access word vectors using the `wv` attribute of the model. Finally, we can find similar words or retrieve the vector representation of a specific word.

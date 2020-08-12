#!/usr/bin/python3
## Solution 1:
def to_rna(dna_strand):
    rna = []
    for transcription in dna_strand:
        if transcription == "G":
            rna.append("C")
        elif transcription == "C":
            rna.append("G")
        elif transcription == "T":
            rna.append("A")
        elif transcription == "A":
            rna.append("U")
    return "".join(rna)

print(to_rna("GCTA"))

## Solution 2:
#def to_rna(dna: str) -> str:
#    """  transcribe a DNA string to RNA and return as another string """
#    translate_table = dna.maketrans('GCTA', 'CGAU')
#
#    rna = dna.translate(translate_table)
#
#    return(rna)

## Solution 3:
#mapping = {'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U'}
#
#def to_rna(dna_strand):
#    return ''.join(mapping[c] for c in dna_strand.upper())

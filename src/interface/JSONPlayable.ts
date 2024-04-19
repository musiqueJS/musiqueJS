interface JSONNote {
    note: string;
    duration: number;
    octave: number;
}

type JSONMusic = JSONNote | JSONNote[];

export { JSONNote, JSONMusic }

import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface MinimalistTemplateProps {
  data: CVData;
}

export const MinimalistTemplate = ({ data }: MinimalistTemplateProps) => {
  const { personalData, profilSingkat, pendidikan, pengalaman, skills, sertifikat } = data;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm] w-full max-w-[210mm] mx-auto font-sans text-sm leading-relaxed">
      {/* Header */}
      <header className="mb-6 pb-4 border-b-2 border-gray-800">
        <div className="flex items-start gap-4">
          {personalData.foto && (
            <img
              src={personalData.foto}
              alt="Foto"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {personalData.namaLengkap || 'Nama Lengkap'}
            </h1>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600">
              {personalData.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {personalData.email}
                </span>
              )}
              {personalData.noHp && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {personalData.noHp}
                </span>
              )}
              {personalData.alamat && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {personalData.alamat}
                </span>
              )}
              {personalData.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" /> {personalData.linkedin}
                </span>
              )}
              {personalData.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {personalData.portfolio}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile */}
      {profilSingkat && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Profil
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">{profilSingkat}</p>
        </section>
      )}

      {/* Education */}
      {pendidikan.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Pendidikan
          </h2>
          {pendidikan.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 text-xs">{edu.institusi}</p>
                  <p className="text-gray-600 text-xs">{edu.jurusan}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {edu.tahunMasuk} - {edu.tahunLulus}
                </span>
              </div>
              {edu.nilai && <p className="text-xs text-gray-600">IPK: {edu.nilai}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {pengalaman.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Pengalaman
          </h2>
          {pengalaman.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 text-xs">{exp.posisi}</p>
                  <p className="text-gray-600 text-xs">{exp.perusahaan}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {exp.tahunMulai} - {exp.tahunSelesai}
                </span>
              </div>
              {exp.deskripsi && (
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.deskripsi}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Skill
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {sertifikat.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Sertifikat & Prestasi
          </h2>
          {sertifikat.map((cert) => (
            <div key={cert.id} className="mb-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-900">{cert.nama}</p>
                  <p className="text-xs text-gray-600">{cert.penerbit}</p>
                </div>
                <span className="text-xs text-gray-500">{cert.tahun}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

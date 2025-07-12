
import { useState } from 'react';
import { Plus, MapPin, Calendar, ExternalLink, Mail, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PersonalInfoForm } from '@/components/PersonalInfoForm';
import { ProjectForm } from '@/components/ProjectForm';
import { ExperienceForm } from '@/components/ExperienceForm';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfo {
  name: string;
  profession: string;
  description: string;
  skills: string[];
  location: string;
  email: string;
  phone: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

const Index = () => {
  const { toast } = useToast();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Juan Jesús Huerta del Toro',
    profession: 'Desarrollador Full Stack',
    description: 'Desarrollador Full-stack con más de 2 años de experiencia creando soluciones digitales eficientes, escalables y centradas en el usuario. Actualmente lidero el equipo de desarrollo en Udigital Business, combinando habilidades técnicas con visión estratégica como Jefe de Ventas. Con formación en QA Testing y UX/UI, aseguro productos de alta calidad y excelente usabilidad, aplicando metodologías ágiles y enfoque al cliente. Mi perfil combina liderazgo, comunicación y experiencia técnica para guiar proyectos de principio a fin.'
    ,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
    location: 'Jalisco, México',
    email: 'juan.jesus1518@gmail.com',
    phone: '+523320343573'
  });

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Proyecto E-commerce',
      description: 'Plataforma de comercio electrónico desarrollada con React y Node.js',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://ejemplo.com'
    }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      position: 'Full Stack Developer',
      company: 'UDigital Business',
      startDate: '2023-07',
      endDate: '',
      current: true,
      description: 'Creación de aplicaciones web escalables utilizando React, Next.js, Node.js, Firebase, MongoDB y PostgreSQL, con enfoque en rendimiento y experiencia de usuario.'
    },
    {
      id: '1',
      position: 'QA Tester',
      company: 'UDigital Business',
      startDate: '2023-07',
      endDate: '',
      current: true,
      description: 'Diseño y ejecución de pruebas manuales y automatizadas (Postman, Cypress, Selenium), garantizando calidad en ciclos ágiles y validando usabilidad con enfoque UX/UI. '
    },
    {
      id: '1',
      position: 'Liderazgo Técnico',
      company: 'UDigital Business',
      startDate: '2023-07',
      endDate: '',
      current: true,
      description: 'Gestión de equipos multidisciplinarios bajo metodologías ágiles (Scrum/Kanban), coordinando proyectos desde la planificación hasta su implementación.'
    },
    {
      id: '1',
      position: 'Gestión Comercial',
      company: 'UDigital Business',
      startDate: '2023-07',
      endDate: '',
      current: true,
      description: 'Responsable de estrategias de prospección, presentación de propuestas técnicas y cierre de proyectos, alineando soluciones a las necesidades del cliente.'
    },
    {
      id: '1',
      position: 'Proyectos Freelance',
      company: 'UDigital Business',
      startDate: '2023-07',
      endDate: '',
      current: true,
      description: 'Desarrollo integral de ERPs, aplicaciones y sitios web personalizados, liderando todo el proceso desde los requerimientos hasta el soporte post-lanzamiento.'
    },
  ]);

  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const handlePersonalInfoSave = (info: PersonalInfo) => {
    setPersonalInfo(info);
    setShowPersonalForm(false);
    toast({
      title: "Información actualizada",
      description: "Tu información personal ha sido actualizada exitosamente.",
    });
  };

  const handleProjectSave = (project: Omit<Project, 'id'>) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...project, id: editingProject.id } : p));
      setEditingProject(null);
      toast({
        title: "Proyecto actualizado",
        description: "El proyecto ha sido actualizado exitosamente.",
      });
    } else {
      const newProject = { ...project, id: Date.now().toString() };
      setProjects([...projects, newProject]);
      toast({
        title: "Proyecto agregado",
        description: "El proyecto ha sido agregado exitosamente.",
      });
    }
    setShowProjectForm(false);
  };

  const handleExperienceSave = (experience: Omit<Experience, 'id'>) => {
    if (editingExperience) {
      setExperiences(experiences.map(e => e.id === editingExperience.id ? { ...experience, id: editingExperience.id } : e));
      setEditingExperience(null);
      toast({
        title: "Experiencia actualizada",
        description: "La experiencia ha sido actualizada exitosamente.",
      });
    } else {
      const newExperience = { ...experience, id: Date.now().toString() };
      setExperiences([...experiences, newExperience]);
      toast({
        title: "Experiencia agregada",
        description: "La experiencia ha sido agregada exitosamente.",
      });
    }
    setShowExperienceForm(false);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Proyecto eliminado",
      description: "El proyecto ha sido eliminado exitosamente.",
    });
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
    toast({
      title: "Experiencia eliminada",
      description: "La experiencia ha sido eliminada exitosamente.",
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Presente';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <MapPin className="h-4 w-4" />
                <span className="text-blue-100">{personalInfo.location}</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {personalInfo.name}
              </h1>
              <h2 className="text-xl lg:text-2xl text-blue-100 mb-6 font-medium">
                {personalInfo.profession}
              </h2>
              <p className="text-lg text-blue-50 mb-8 max-w-2xl leading-relaxed">
                {personalInfo.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                {personalInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button
                onClick={() => setShowPersonalForm(true)}
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Información
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/10 flex items-center justify-center text-6xl lg:text-8xl font-bold">
                  {personalInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Mis Proyectos
              </h2>
              <p className="text-gray-600 text-lg">
                Una selección de mis trabajos más destacados
              </p>
            </div>
            <Button
              onClick={() => setShowProjectForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Proyecto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setEditingProject(project);
                        setShowProjectForm(true);
                      }}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-500/90 hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Ver proyecto <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Experiencia Profesional
              </h2>
              
               
            </div>
            <Button
              onClick={() => setShowExperienceForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Experiencia
            </Button>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <Card key={experience.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${experience.current ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {experience.position}
                        </h3>
                        {experience.current && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Actual
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-lg font-medium text-blue-600 mb-3">
                        {experience.company}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {experience.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingExperience(experience);
                          setShowExperienceForm(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteExperience(experience.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para trabajar juntos?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Estoy disponible para nuevos proyectos y oportunidades de colaboración.
            ¡Hablemos sobre tu próxima idea!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              <Mail className="h-5 w-5 mr-3" />
              Enviar Email
            </a>
            <a
              href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 shadow-lg"
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Forms */}
      {showPersonalForm && (
        <PersonalInfoForm
          initialData={personalInfo}
          onSave={handlePersonalInfoSave}
          onClose={() => setShowPersonalForm(false)}
        />
      )}

      {showProjectForm && (
        <ProjectForm
          initialData={editingProject}
          onSave={handleProjectSave}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
        />
      )}

      {showExperienceForm && (
        <ExperienceForm
          initialData={editingExperience}
          onSave={handleExperienceSave}
          onClose={() => {
            setShowExperienceForm(false);
            setEditingExperience(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
